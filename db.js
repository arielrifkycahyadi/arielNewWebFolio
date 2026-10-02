/**
 * Database Layer for Ariel Usman Portfolio & CMS
 * Supports JSON Local Database + Seamless Supabase Integration
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const os = require('os');
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

// Use /tmp directory if running in read-only serverless environments like Vercel/AWS Lambda
const DATA_DIR = isServerless ? path.join(os.tmpdir(), 'ariel_data') : path.join(__dirname, 'data');
const UPLOADS_DIR = isServerless ? path.join(os.tmpdir(), 'ariel_uploads') : path.join(__dirname, 'uploads');

try {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
} catch (err) {
  // Read-only filesystem fallback
}

try {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
} catch (err) {
  // Read-only filesystem fallback
}

const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const CERTS_FILE = path.join(DATA_DIR, 'certificates.json');
const VAULT_FILE = path.join(DATA_DIR, 'vault.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Supabase Client Setup (if configured)
let supabase = null;
if (process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  supabase = createClient(process.env.SUPABASE_URL, key);
  console.log('✅ Supabase Cloud connected successfully.');
}

// Helper read/write JSON safely
function readJSON(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) {
      // In serverless, check if bundled copy exists in __dirname/data
      const baseName = path.basename(file);
      const bundledFile = path.join(__dirname, 'data', baseName);
      if (fs.existsSync(bundledFile)) {
        return JSON.parse(fs.readFileSync(bundledFile, 'utf8'));
      }
      try {
        fs.writeFileSync(file, JSON.stringify(fallback, null, 2), 'utf8');
      } catch (writeErr) {
        // Ignore read-only write error
      }
      return fallback;
    }
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Fail gracefully on serverless
  }
}

// Initial Seed from projects.js if projects.json is empty
function seedInitialData() {
  const currentProjects = readJSON(PROJECTS_FILE, []);
  if (currentProjects.length === 0) {
    const projectsJsPath = path.join(__dirname, 'projects.js');
    if (fs.existsSync(projectsJsPath)) {
      try {
        const fileContent = fs.readFileSync(projectsJsPath, 'utf8');
        // Extract array from projects.js
        const match = fileContent.match(/const\s+projects\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
          // evaluate in safe context
          const parsed = new Function(`return ${match[1]}`)();
          const seeded = parsed.map((p, idx) => ({
            id: `proj_${Date.now()}_${idx}`,
            title: p.title || '',
            url: p.url || '',
            driveId: p.driveId || '',
            category: p.category || 'creative',
            description: p.description || '',
            thumbnail_url: p.thumbnail_url || null,
            created_at: new Date().toISOString()
          }));
          writeJSON(PROJECTS_FILE, seeded);
          console.log(`✅ Seeded ${seeded.length} projects into local database.`);
        }
      } catch (err) {
        console.warn('Could not auto-parse projects.js for seeding:', err);
      }
    }
  }

  // Seed certificates if empty
  const currentCerts = readJSON(CERTS_FILE, []);
  if (currentCerts.length === 0) {
    const initialCerts = [
      {
        id: `cert_${Date.now()}_1`,
        title: 'AI & Automation Specialist',
        issuer: 'SkillID',
        category: 'ai',
        path: 'sertifkat/AI SkillID/AI & AUTOMATION.pdf',
        desc: 'Sertifikasi kompetensi dalam otomatisasi alur kerja dan kecerdasan buatan terapan.',
        created_at: new Date().toISOString()
      },
      {
        id: `cert_${Date.now()}_2`,
        title: 'Developing with AI (Vibe Coding)',
        issuer: 'SkillID',
        category: 'ai',
        path: 'sertifkat/AI SkillID/DEVELOPING WITH AI VIBE CODING.pdf',
        desc: 'Sertifikat keahlian menggunakan model AI untuk pemrograman kolaboratif/asisten coding.',
        created_at: new Date().toISOString()
      },
      {
        id: `cert_${Date.now()}_3`,
        title: 'Professional Skill in AI',
        issuer: 'SkillID',
        category: 'ai',
        path: 'sertifkat/AI SkillID/Professional Skill AI.pdf',
        desc: 'Kompetensi tingkat lanjut penerapan AI pada solusi industri dan produktivitas harian.',
        created_at: new Date().toISOString()
      },
      {
        id: `cert_${Date.now()}_4`,
        title: 'Crash Course on Python',
        issuer: 'Google (via Coursera)',
        category: 'ai',
        path: 'sertifkat/AI Coursera/Coursera Crash Course on Python.pdf',
        desc: 'Sertifikat dasar pemrograman berorientasi objek menggunakan Python.',
        created_at: new Date().toISOString()
      },
      {
        id: `cert_${Date.now()}_5`,
        title: 'Kampanye Kreatif Skala Besar',
        issuer: 'Canva Academy',
        category: 'design',
        path: 'sertifkat/Canva/ariel-rifky-cahyadi-kampanye-kreatif-skala-besar-certificate.pdf',
        desc: 'Sertifikat merancang media publikasi visual skala industri menggunakan platform Canva.',
        created_at: new Date().toISOString()
      },
      {
        id: `cert_${Date.now()}_6`,
        title: 'Excel Sales Analytics Specialist',
        issuer: 'Microsoft Data Course',
        category: 'office',
        path: 'sertifkat/Speasialis Project Excel/Sales Analysis Excel/PROJECT CREATING SALES ANALYTICS IN EXCEL.pdf',
        desc: 'Sertifikat kelulusan studi kasus visualisasi metrik bisnis penjualan dan analisis tren.',
        created_at: new Date().toISOString()
      }
    ];
    writeJSON(CERTS_FILE, initialCerts);
    console.log(`✅ Seeded ${initialCerts.length} certificates into local database.`);
  }
}

seedInitialData();

// Database Access Objects
const DB = {
  // --- PROJECTS ---
  async getProjects() {
    if (supabase) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return readJSON(PROJECTS_FILE, []);
  },

  async addProject(project) {
    const newProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...project,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('projects').insert([{
          title: newProject.title,
          url: newProject.url,
          drive_id: newProject.driveId || null,
          category: newProject.category,
          description: newProject.description,
          thumbnail_url: newProject.thumbnail_url || null
        }]);
      } catch (e) {
        console.warn('Supabase project insert fallback to local:', e);
      }
    }

    const list = readJSON(PROJECTS_FILE, []);
    list.unshift(newProject);
    writeJSON(PROJECTS_FILE, list);
    return newProject;
  },

  async deleteProject(id) {
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {}
    }
    const list = readJSON(PROJECTS_FILE, []);
    const filtered = list.filter(item => item.id !== id);
    writeJSON(PROJECTS_FILE, filtered);
    return true;
  },

  // --- CERTIFICATES ---
  async getCertificates() {
    if (supabase) {
      const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(c => ({
          id: c.id,
          title: c.title,
          issuer: c.issuer,
          category: c.category,
          path: c.file_url || c.path,
          desc: c.description || c.desc,
          created_at: c.created_at
        }));
      }
    }
    return readJSON(CERTS_FILE, []);
  },

  async addCertificate(cert) {
    const newCert = {
      id: `cert_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...cert,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('certificates').insert([{
          title: newCert.title,
          issuer: newCert.issuer,
          category: newCert.category,
          file_url: newCert.path,
          description: newCert.desc
        }]);
      } catch (e) {
        console.warn('Supabase cert insert fallback to local:', e);
      }
    }

    const list = readJSON(CERTS_FILE, []);
    list.unshift(newCert);
    writeJSON(CERTS_FILE, list);
    return newCert;
  },

  async deleteCertificate(id) {
    if (supabase) {
      try {
        await supabase.from('certificates').delete().eq('id', id);
      } catch (e) {}
    }
    const list = readJSON(CERTS_FILE, []);
    const filtered = list.filter(item => item.id !== id);
    writeJSON(CERTS_FILE, filtered);
    return true;
  },

  // --- VAULT (IMPORTANT FILES) ---
  async getVaultFiles() {
    if (supabase) {
      const { data, error } = await supabase.from('important_files').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return readJSON(VAULT_FILE, []);
  },

  async addVaultFile(fileDoc) {
    const newFile = {
      id: `vault_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...fileDoc,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('important_files').insert([{
          file_name: newFile.fileName,
          file_url: newFile.fileUrl,
          file_type: newFile.fileType,
          description: newFile.description
        }]);
      } catch (e) {}
    }

    const list = readJSON(VAULT_FILE, []);
    list.unshift(newFile);
    writeJSON(VAULT_FILE, list);
    return newFile;
  },

  async deleteVaultFile(id) {
    if (supabase) {
      try {
        await supabase.from('important_files').delete().eq('id', id);
      } catch (e) {}
    }
    const list = readJSON(VAULT_FILE, []);
    const filtered = list.filter(item => item.id !== id);
    writeJSON(VAULT_FILE, filtered);
    return true;
  },

  // --- CONTACT MESSAGES LOG ---
  async addContactLog(contactData) {
    const list = readJSON(CONTACTS_FILE, []);
    const newEntry = {
      id: `contact_${Date.now()}`,
      ...contactData,
      created_at: new Date().toISOString()
    };
    list.unshift(newEntry);
    writeJSON(CONTACTS_FILE, list);
    return newEntry;
  }
};

module.exports = DB;
