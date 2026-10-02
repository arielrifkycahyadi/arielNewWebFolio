const fs = require('fs');
const path = require('path');

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf8'));
const certs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/certificates.json'), 'utf8'));

function escapeSql(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- ==============================================================================
-- SCHEMA & DATA SEEDER SUPABASE UNTUK PORTOFOLIO & CMS ARIEL USMAN (MADEAI)
-- Jalankan query ini di menu SQL Editor pada Supabase Project Anda (1-Click Setup)
-- ==============================================================================

-- 1. TABEL PROJECTS (Portofolio Website, Simulator, Opini, Branding)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    drive_id TEXT,
    category TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index untuk query performa tinggi
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- 2. TABEL CERTIFICATES (Sertifikat & Kredensial Resmi)
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_certs_category ON public.certificates(category);
CREATE INDEX IF NOT EXISTS idx_certs_created_at ON public.certificates(created_at DESC);

-- 3. TABEL IMPORTANT_FILES (Vault Dokumen Penting Pribadi)
CREATE TABLE IF NOT EXISTS public.important_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL CONTACTS (Pesan Kontak & Log)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    message TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.important_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Public Read & Full Manage Policies
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Projects" ON public.projects;
CREATE POLICY "Public Insert Projects" ON public.projects FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Delete Projects" ON public.projects;
CREATE POLICY "Public Delete Projects" ON public.projects FOR DELETE USING (true);
DROP POLICY IF EXISTS "Public Update Projects" ON public.projects;
CREATE POLICY "Public Update Projects" ON public.projects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Certificates" ON public.certificates;
CREATE POLICY "Public Insert Certificates" ON public.certificates FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Delete Certificates" ON public.certificates;
CREATE POLICY "Public Delete Certificates" ON public.certificates FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public Read Files" ON public.important_files;
CREATE POLICY "Public Read Files" ON public.important_files FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Files" ON public.important_files;
CREATE POLICY "Public Insert Files" ON public.important_files FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Delete Files" ON public.important_files;
CREATE POLICY "Public Delete Files" ON public.important_files FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public Insert Contacts" ON public.contacts;
CREATE POLICY "Public Insert Contacts" ON public.contacts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Read Contacts" ON public.contacts;
CREATE POLICY "Public Read Contacts" ON public.contacts FOR SELECT USING (true);

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio-assets', 'portfolio-assets', true),
  ('certificates-vault', 'certificates-vault', true),
  ('important-vault', 'important-vault', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public Access Storage Portfolio" ON storage.objects;
CREATE POLICY "Public Access Storage Portfolio" ON storage.objects FOR ALL USING (bucket_id IN ('portfolio-assets', 'certificates-vault', 'important-vault')) WITH CHECK (bucket_id IN ('portfolio-assets', 'certificates-vault', 'important-vault'));

-- ==============================================================================
-- INITIAL DATA SEEDING (99+ Portofolio & Sertifikat Asli Ariel Usman)
-- ==============================================================================
`;

sql += '-- Seed Projects (Hanya insert jika belum ada judul yang sama)\n';
projects.forEach(p => {
  sql += `INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT ${escapeSql(p.title)}, ${escapeSql(p.url)}, ${escapeSql(p.driveId)}, ${escapeSql(p.category)}, ${escapeSql(p.description)}, ${escapeSql(p.thumbnail_url)}
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = ${escapeSql(p.title)});\n`;
});

sql += '\n-- Seed Certificates\n';
certs.forEach(c => {
  sql += `INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT ${escapeSql(c.title)}, ${escapeSql(c.issuer)}, ${escapeSql(c.category)}, ${escapeSql(c.path)}, ${escapeSql(c.desc)}
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = ${escapeSql(c.title)});\n`;
});

const outputPath = path.join(__dirname, '../supabase_schema.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log('Successfully generated full supabase_schema.sql with ' + projects.length + ' projects and ' + certs.length + ' certificates.');
