/**
 * ==============================================================================
 * Supabase Cloud Master Engine for Ariel Usman Portfolio & CMS
 * Handles 100% cloud database, storage uploads, and realtime auto-sync on Vercel
 * ==============================================================================
 */

// Default Supabase project credentials (can be overridden via localStorage or admin settings)
const DEFAULT_SUPABASE_URL = localStorage.getItem('ariel_supabase_url') || '';
const DEFAULT_SUPABASE_KEY = localStorage.getItem('ariel_supabase_key') || '';

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const url = localStorage.getItem('ariel_supabase_url') || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('ariel_supabase_key') || DEFAULT_SUPABASE_KEY;

  if (window.supabase && url && key) {
    try {
      supabaseClient = window.supabase.createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return supabaseClient;
    } catch (err) {
      console.warn('Supabase initialization warning:', err);
      return null;
    }
  }
  return null;
}

// Initialize on script load
getSupabaseClient();

/**
 * Fetch Projects directly from Supabase with fallback to local projects
 */
async function getLiveProjects(localFallback = []) {
  const client = getSupabaseClient();
  if (!client) return localFallback;
  try {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      return localFallback;
    }

    // Normalisasi struktur field database
    const remoteProjects = data.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      driveId: item.drive_id || item.driveId || '',
      category: item.category,
      description: item.description || '',
      thumbnail_url: item.thumbnail_url || null,
      created_at: item.created_at
    }));

    // Gabungkan proyek remote & fallback lokal yang belum ada
    const combined = [...remoteProjects];
    localFallback.forEach(localItem => {
      if (!combined.some(r => r.title.trim().toLowerCase() === (localItem.title || '').trim().toLowerCase())) {
        combined.push(localItem);
      }
    });

    return combined;
  } catch (e) {
    console.warn('Gagal memuat projects dari Supabase:', e);
    return localFallback;
  }
}

/**
 * Add New Project to Supabase
 */
async function addProjectToCloud(project) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client belum terhubung.');
  const payload = {
    title: project.title,
    url: project.url,
    drive_id: project.driveId || project.drive_id || null,
    category: project.category,
    description: project.description || '',
    thumbnail_url: project.thumbnail_url || null
  };
  const { data, error } = await client.from('projects').insert([payload]).select();
  if (error) throw error;
  return data[0];
}

/**
 * Delete Project from Supabase
 */
async function deleteProjectFromCloud(id) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client belum terhubung.');
  const { error } = await client.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Fetch Certificates directly from Supabase with fallback to local array
 */
async function getLiveCertificates(localFallback = []) {
  const client = getSupabaseClient();
  if (!client) return localFallback;
  try {
    const { data, error } = await client
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      return localFallback;
    }

    const remoteCerts = data.map(item => ({
      id: item.id,
      title: item.title,
      issuer: item.issuer,
      category: item.category,
      path: item.file_url || item.path,
      desc: item.description || item.desc || '',
      created_at: item.created_at
    }));

    const combined = [...remoteCerts];
    localFallback.forEach(localItem => {
      if (!combined.some(r => r.title.trim().toLowerCase() === (localItem.title || '').trim().toLowerCase())) {
        combined.push(localItem);
      }
    });

    return combined;
  } catch (e) {
    console.warn('Gagal memuat sertifikat dari Supabase:', e);
    return localFallback;
  }
}

/**
 * Add Certificate to Supabase
 */
async function addCertificateToCloud(cert) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client belum terhubung.');
  const payload = {
    title: cert.title,
    issuer: cert.issuer,
    category: cert.category,
    file_url: cert.file_url || cert.path,
    description: cert.description || cert.desc || ''
  };
  const { data, error } = await client.from('certificates').insert([payload]).select();
  if (error) throw error;
  return data[0];
}

/**
 * Delete Certificate from Supabase
 */
async function deleteCertificateFromCloud(id) {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client belum terhubung.');
  const { error } = await client.from('certificates').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Upload File to Supabase Storage Bucket (Mobile & Desktop optimized)
 */
async function uploadToSupabaseStorage(file, bucketName = 'portfolio-assets') {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase client belum terhubung. Konfigurasikan URL & Key di menu admin.');

  // Clean filename
  const fileExt = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await client.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: publicUrlData } = client.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Save Contact Message to Supabase
 */
async function sendContactMessage(msg) {
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { error } = await client.from('contacts').insert([{
      name: msg.name,
      email: msg.email || null,
      message: msg.message
    }]);
    return !error;
  } catch (err) {
    console.warn('Contact message save warning:', err);
    return false;
  }
}

/**
 * Realtime Listener for Auto-Refresh on Any Device
 */
function listenToCloudChanges(table, onUpdate) {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const channel = client
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        if (typeof onUpdate === 'function') onUpdate(payload);
      })
      .subscribe();
    return channel;
  } catch (err) {
    console.warn('Realtime subscription warning:', err);
    return null;
  }
}

// Global Export
window.ArielCloud = {
  getClient: getSupabaseClient,
  getProjects: getLiveProjects,
  addProject: addProjectToCloud,
  deleteProject: deleteProjectFromCloud,
  getCertificates: getLiveCertificates,
  addCertificate: addCertificateToCloud,
  deleteCertificate: deleteCertificateFromCloud,
  uploadFile: uploadToSupabaseStorage,
  sendContact: sendContactMessage,
  listen: listenToCloudChanges,
  isConfigured: () => Boolean(localStorage.getItem('ariel_supabase_url') && localStorage.getItem('ariel_supabase_key'))
};
