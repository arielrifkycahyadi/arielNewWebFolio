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

  const { data, error } = await client.storage
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
  getCertificates: getLiveCertificates,
  uploadFile: uploadToSupabaseStorage,
  listen: listenToCloudChanges
};
