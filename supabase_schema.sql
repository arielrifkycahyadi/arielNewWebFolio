-- ==============================================================================
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
-- Seed Projects (Hanya insert jika belum ada judul yang sama)
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Meme Account Admin (Mr. Garbage)', 'https://drive.google.com/drive/folders/16NDhmqz54x062vo6gMBS5GTErYp_rsC5?usp=drive_link', '16NDhmqz54x062vo6gMBS5GTErYp_rsC5', 'creative', 'Pengalaman mengelola akun hiburan Mr. Garbage dengan mengubah ide/komentar netizen menjadi konten visual (meme/komik) viral berinteraksi tinggi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Meme Account Admin (Mr. Garbage)');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Beginner Comic Illustrator Portfolio', 'https://drive.google.com/drive/folders/1wzPqL64XXezoN61tKUVPLUDIkTvSwFBm?usp=drive_link', '1wzPqL64XXezoN61tKUVPLUDIkTvSwFBm', 'creative', 'Koleksi komik strip orisinal, desain karakter, dan visual storytelling penarik interaksi dua arah dengan audiens.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Beginner Comic Illustrator Portfolio');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Aspiring 2D Animator (Body Mechanics)', 'https://drive.google.com/drive/folders/1u-tQA6Pv2G7V0j9-BBxX_rPQya40f2rk?usp=drive_link', '1u-tQA6Pv2G7V0j9-BBxX_rPQya40f2rk', 'creative', 'Portofolio animasi 2D berfokus pada penguatan fondasi gerakan (12 Principles of Animation), Body Mechanics, dan Fluidity.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Aspiring 2D Animator (Body Mechanics)');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Junior Creative Designer Portfolio', 'https://drive.google.com/drive/folders/1X-at_Fsao37EeZjLA65MDO7Sc5KZpp0t?usp=drive_link', '1X-at_Fsao37EeZjLA65MDO7Sc5KZpp0t', 'creative', 'Desain grafis komersial (F&B) dan desain korporat fungsional berkepekaan visual tinggi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Junior Creative Designer Portfolio');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Junior Multimedia Designer & Visual Artist', 'https://drive.google.com/drive/folders/1_MmADBU63MDlhpoGINYnQz7yJrBUe6fN?usp=drive_link', '1_MmADBU63MDlhpoGINYnQz7yJrBUe6fN', 'creative', 'Eksplorasi gaya visual Generalist, mulai dari estetika retro Pixel Art, Flat Design, hingga Fotografi Arsitektur.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Junior Multimedia Designer & Visual Artist');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Video Editor & PNGTuber Asset Creator', 'https://drive.google.com/drive/folders/174V-fH3mk1-m9gNxNyZMZ9_3QYAPY2zY?usp=drive_link', '174V-fH3mk1-m9gNxNyZMZ9_3QYAPY2zY', 'creative', 'Siklus produksi lengkap video ''Faceless Channel'': penulisan naskah, desain karakter & aset PNGTuber, hingga editing video dinamis.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Video Editor & PNGTuber Asset Creator');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'MADEAI Personal Branding Ariel', 'https://linktr.ee/madeaircun', NULL, 'branding', 'Direktori tautan resmi personal branding Ariel Usman (MADEAI).', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'MADEAI Personal Branding Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'OBBKdotCom: Homeless Media', 'https://www.instagram.com/obbkdotcom/', NULL, 'branding', 'Profil OBBKdotCom, layanan penyediaan dan konsultasi media kreatif independen.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'OBBKdotCom: Homeless Media');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'NDNSanti: Web Developer Portfolio', 'https://ndnsanti19.github.io/listproject.html', NULL, 'branding', 'Portofolio kolaboratif jasa pengembangan situs web developer NDNSanti.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'NDNSanti: Web Developer Portfolio');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Emosian dan Baca Pikiran Orang Tidak Membuatmu Cerdas', 'https://medium.com/@a.r.cusman05789/emosian-dan-baca-pikiran-orang-tidak-membuatmu-cerdas-384a8315f231', NULL, 'writing', 'Esai kritis mengenai miskonsepsi kecerdasan emosional dan fenomena pseudosains membaca pikiran orang lain.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Emosian dan Baca Pikiran Orang Tidak Membuatmu Cerdas');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kapan Ariel Menikah? Analisis Sosial & Ekonomi', 'https://medium.com/@a.r.cusman05789/kapan-ariel-menikah-analisis-dengan-pendekatan-sosial-dan-ekonomi-5291498ce172', NULL, 'writing', 'Analisis semi-humor berdasar pendekatan sosiologi dan ekonomi mengenai waktu pernikahan ideal.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kapan Ariel Menikah? Analisis Sosial & Ekonomi');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Oposisi Baik Benar ala Pandji Pragiwaksono', 'https://medium.com/@a.r.cusman05789/oposisi-baik-benar-ala-pandji-bukan-petualang-pragiwaksono-3e5e74acd848', NULL, 'writing', 'Opini tentang struktur oposisi politik yang sehat merujuk pada pemikiran komedian Pandji Pragiwaksono.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Oposisi Baik Benar ala Pandji Pragiwaksono');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kamu Sebenarnya Tidak Depresi', 'https://medium.com/@a.r.cusman05789/kamu-sebenarnya-tidak-depresi-dan-kenapa-depresi-harus-selalu-minta-tolong-a84aed85ff42', NULL, 'writing', 'Bahasan psikologis mengenai perbedaan kesedihan mendalam (sadness) dengan depresi klinis.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kamu Sebenarnya Tidak Depresi');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ini Cerita Kamu Juga: Alibanana dan Kebun Yang...', 'https://www.wattpad.com/1629965156-ini-cerita-kamu-juga-alibanana-dan-kebun-yang', NULL, 'writing', 'Cerita pendek fiksi kolaboratif bersama MADEAI tentang Alibanana dan kebun misteriusnya.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ini Cerita Kamu Juga: Alibanana dan Kebun Yang...');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ini Cerita Kamu Juga: Permintaan Baharudin', 'https://www.wattpad.com/1629967684-ini-cerita-kamu-juga-permintaan-baharudin-1-2', NULL, 'writing', 'Naskah cerita fiksi berseri mengenai keinginan dan dilema hidup Baharudin.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ini Cerita Kamu Juga: Permintaan Baharudin');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ini Cerita Kamu Juga: Tanda di Bawah Bendera', 'https://www.wattpad.com/1629968923-ini-cerita-kamu-juga-tanda-di-bawah-bendera-1-5', NULL, 'writing', 'Kisah fiksi perjuangan dan simbolisme bendera dalam serial kolaboratif.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ini Cerita Kamu Juga: Tanda di Bawah Bendera');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ini Cerita Kamu Juga: Kitab Yang Tidak Ada di Rak', 'https://www.wattpad.com/1629970605-ini-cerita-kamu-juga-kitab-yang-tidak-ada-di-rak', NULL, 'writing', 'Misteri pencarian manuskrip hilang dalam perpustakaan fiksi tersembunyi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ini Cerita Kamu Juga: Kitab Yang Tidak Ada di Rak');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'POV: Cewek Jepang Capek Hustle Culture & Cheat Code Qawwam', 'https://medium.com/@madeaircun/pov-lo-cewek-jepang-yang-udah-capek-sama-hustle-culture-terus-nemun-cheat-code-bernama-qawwam-dcbfa8d80f4e', NULL, 'writing', 'Perspektif kejenuhan budaya kerja Jepang (karoshi) dan solusi konsep kepemimpinan rumah tangga Islam (Qawwam).', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'POV: Cewek Jepang Capek Hustle Culture & Cheat Code Qawwam');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Umbar Aib di Sosmed: Cari Solusi atau Sensasi?', 'https://medium.com/@madeaircun/umbar-aib-di-sosmed-katanya-cari-solusi-nyatanya-cuma-cari-sensasi-dan-bikin-tambah-sakit-0de46e2b6330', NULL, 'writing', 'Kritik sosial tentang tren curhat masalah pribadi secara terbuka di jagat maya.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Umbar Aib di Sosmed: Cari Solusi atau Sensasi?');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Matinya Otoritas: Youtuber vs Media Arus Utama', 'https://medium.com/@madeaircun/matinya-otoritas-kenapa-kita-lebih-percaya-youtuber-daripada-media-arus-utama-bbf0b5266ea3', NULL, 'writing', 'Analisis pergeseran kepercayaan publik dari instansi media pers tradisional ke kreator video independen.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Matinya Otoritas: Youtuber vs Media Arus Utama');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'AI Nggak Akan Gantiin Kamu, Tapi...', 'https://medium.com/@madeaircun/ai-nggak-akan-gantiin-kamu-tapi-orang-yang-punya-otak-saat-ai-nya-mati-yang-bakal-gantiin-kamu-53f5619971f3', NULL, 'writing', 'Pandangan realistis tentang relevansi keahlian berpikir manusia orisinal di tengah maraknya era AI.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'AI Nggak Akan Gantiin Kamu, Tapi...');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Dari Kokpit Pesawat Tempur ke Ruang Operasi', 'https://medium.com/@madeaircun/dari-kokpit-pesawat-tempur-ke-ruang-operasi-bagaimana-perang-dunia-ii-menyelamatkan-mata-kita-f0e4102e7fae', NULL, 'writing', 'Sejarah unik bagaimana inovasi kedirgantaraan militer PD II membantu kemajuan bedah optik mata.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Dari Kokpit Pesawat Tempur ke Ruang Operasi');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Mitos Rumput Tetangga Lebih Hijau Pasca-Perceraian', 'https://medium.com/@madeaircun/mitos-rumput-tetangga-lebih-hijau-memahami-dinamika-hubungan-dan-market-value-pasca-perceraian-7e22787070ff', NULL, 'writing', 'Psikologi relasi dan penilaian nilai tawar sosial pasca-perpisahan pernikahan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Mitos Rumput Tetangga Lebih Hijau Pasca-Perceraian');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kenapa Kita Merasa Hampa Justru Saat Paling Berguna?', 'https://medium.com/@madeaircun/kenapa-kita-merasa-hampa-justru-saat-paling-berguna-membedah-krisis-identitas-perempuan-modern-a34ca410ce6b', NULL, 'writing', 'Ulasan sosiologis krisis identitas eksistensial wanita karir di perkotaan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kenapa Kita Merasa Hampa Justru Saat Paling Berguna?');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Seni Menjadi Pecah: Perspektif Kintsugi', 'https://medium.com/@madeaircun/seni-menjadi-pecah-mengapa-retakan-di-hidupmu-justru-berharga-perspektif-kintsugi-psikologi-97863727bb23', NULL, 'writing', 'Mengintegrasikan seni perbaikan keramik emas Jepang (Kintsugi) dengan pemulihan trauma mental.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Seni Menjadi Pecah: Perspektif Kintsugi');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kenapa Motivasi itu Penipu', 'https://medium.com/@madeaircun/kenapa-motivasi-itu-penipu-rahasia-membangun-mental-baja-saat-hidup-lagi-ngaco-f0e8aea00749', NULL, 'writing', 'Mengapa disiplin dan sistem jauh lebih berharga daripada luapan motivasi sesaat.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kenapa Motivasi itu Penipu');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Seni Menibu Pasir: Isi Kepala Komputermu', 'https://medium.com/@madeaircun/seni-menipu-pasir-mengapa-anda-perlu-mengerti-isi-kepala-komputer-anda-4e0e1314acd1', NULL, 'writing', 'Edukasi perangkat keras bagaimana silikon (pasir) diubah menjadi prosesor super cerdas.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Seni Menibu Pasir: Isi Kepala Komputermu');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Fenomena Brain Rot & Algoritma Sosmed', 'https://medium.com/@madeaircun/fenomena-brain-rot-kenapa-hp-lo-bikin-lo-lupa-niat-awal-dan-cara-otak-lo-disuapin-algoritma-0391e6caf90e', NULL, 'writing', 'Dampak kecanduan stimulasi video pendek (TikTok/Reels) pada neurotransmitter dopamin otak.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Fenomena Brain Rot & Algoritma Sosmed');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Tuhan Bukan Tukang Pencet Tombol', 'https://medium.com/@madeaircun/tuhan-bukan-tukang-pencet-tombol-kenapa-realitas-kita-belum-shutdown-detik-ini-bb118fcc7bab', NULL, 'writing', 'Refleksi filosofis-teologis tentang eksistensi alam semesta dan pemeliharaan ilahi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Tuhan Bukan Tukang Pencet Tombol');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Benteng Terakhir: Institusi Keluarga di Era Digital', 'https://medium.com/@madeaircun/benteng-terakhir-mengapa-institusi-keluarga-bukan-sekadar-pajangan-di-era-digital-ebd812fce1d4', NULL, 'writing', 'Pentingnya pengokohan struktur terkecil masyarakat (keluarga) membendung arus informasi bebas.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Benteng Terakhir: Institusi Keluarga di Era Digital');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Mencari Mizan di Tengah Hustle Culture', 'https://medium.com/@madeaircun/mencari-mizan-di-tengah-hustle-culture-mengapa-burnout-adalah-prank-terbesar-abad-ini-a4fb717d3929', NULL, 'writing', 'Konsep keseimbangan hidup (mizan) sebagai penangkal stres kerja berlebihan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Mencari Mizan di Tengah Hustle Culture');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Menikah Itu Bukan Final Boss, Tapi Awal Bootcamp Rohani', 'https://medium.com/@madeaircun/menikah-itu-bukan-final-boss-tapi-awal-bootcamp-rohani-seni-berantem-yang-bikin-makin-cinta-8a57ba0f222f', NULL, 'writing', 'Seni mengelola konflik pasangan suami istri agar mempererat ikatan pernikahan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Menikah Itu Bukan Final Boss, Tapi Awal Bootcamp Rohani');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Saat Terapi Saja Tidak Cukup: Seni Menyembuhkan Jiwa', 'https://medium.com/@madeaircun/saat-terapi-saja-tidak-cukup-mengapa-kita-perlu-melirik-kembali-seni-menyembuhkan-jiwa-ala-27bc8d2c36d1', NULL, 'writing', 'Pendekatan komplementer holistik spiritual untuk memulihkan luka batin terdalam.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Saat Terapi Saja Tidak Cukup: Seni Menyembuhkan Jiwa');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Arsitektur Jiwa dalam Tradisi Islam', 'https://medium.com/@madeaircun/mengapa-psikologi-modern-terkadang-terasa-hambar-menengok-arsitektur-jiwa-dalam-tradisi-islam-3d18846731fd', NULL, 'writing', 'Membandingkan kognisi psikologi sekuler barat dengan anatomi kalbu dan akal dalam Islam.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Arsitektur Jiwa dalam Tradisi Islam');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Saat Iman Bertemu Kesehatan Mental', 'https://medium.com/@madeaircun/saat-iman-bertemu-kesehatan-mental-mengapa-berdoa-saja-terkadang-belum-cukup-7b632a62fee1', NULL, 'writing', 'Menjembatani ikhtiar medis/psikologis dengan kepasrahan doa spiritual.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Saat Iman Bertemu Kesehatan Mental');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Siapa yang Sebenarnya Menyetir Tubuh Anda?', 'https://medium.com/@madeaircun/siapa-yang-sebenarnya-menyetir-tubuh-anda-5cc35dde7aff', NULL, 'writing', 'Diskusi biologi saraf mengenai alam bawah sadar, refleks instingtif, dan kehendak bebas.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Siapa yang Sebenarnya Menyetir Tubuh Anda?');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kasus Chromebook Nadiem Makarim', 'https://medium.com/@madeaircun/kasus-chromebook-nadiem-makarim-korupsi-nyata-atau-kriminalisasi-kebijakan-867842b3cae5', NULL, 'writing', 'Telaah kritis kebijakan pengadaan laptop Chromebook di sekolah negeri di Indonesia.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kasus Chromebook Nadiem Makarim');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Pengaruh Dominasi Konsumsi Infotainment', 'https://medium.com/@madeaircun/pengaruh-dominasi-konsumsi-infotainment-terhadap-kualitas-sumber-daya-manusia-dan-prospek-kemajuan-9015a91cdacf', NULL, 'writing', 'Dampak paparan konten gosip dan sensasi terhadap degradasi daya kritis masyarakat.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Pengaruh Dominasi Konsumsi Infotainment');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kesehatan Mental: Tinjauan Historis, Kognitif & Holistik Islam', 'https://medium.com/@madeaircun/kesehatan-mental-dalam-perspektif-islam-tinjauan-historis-kognitif-dan-pendekatan-holistik-f852b6261c4f', NULL, 'writing', 'Sejarah pengobatan mental di masa kejayaan Islam (bimaristan) dan integrasi sains kognitif modern.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kesehatan Mental: Tinjauan Historis, Kognitif & Holistik Islam');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Saat Otak Menciut Karena Stres', 'https://medium.com/@madeaircun/saat-otak-menciut-karena-stres-apa-yang-sebenarnya-terjadi-di-dalam-kepala-kita-964789868d25', NULL, 'writing', 'Mekanisme biologis hormon kortisol merusak sel saraf di hipokampus otak.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Saat Otak Menciut Karena Stres');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Macneo by MadeAI', 'https://arielrifkycahyadi.github.io/neomac-by-madeai/', NULL, 'tools', 'Pengalaman web futuristik Macneo yang terinspirasi karya MadeAI dengan nuansa warna modern dan minimal.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Macneo by MadeAI');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Artriel Art Gallery', 'https://arielrifkycahyadi.github.io/artriel-art-gallery', NULL, 'interactive', 'Galeri seni Artriel yang menampilkan karya visual dengan antarmuka yang elegan dan responsif.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Artriel Art Gallery');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Xiaomi Pricelist by MadeAI', 'https://harga-mi-madeai.lovable.app', NULL, 'tools', 'Tampilan daftar harga ponsel Xiaomi yang rapi, bersih, dan efisien untuk membantu pencarian produk.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Xiaomi Pricelist by MadeAI');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Play Kalimba with MadeAI', 'https://kalimba-madeai-learn.lovable.app', NULL, 'interactive', 'Aplikasi interaktif untuk belajar dan memainkan instrumen Kalimba virtual secara intuitif.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Play Kalimba with MadeAI');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'MadeAI Sky Seer', 'https://madeai-sky.lovable.app', NULL, 'tools', 'Antarmuka langit eksplorasi data secara visual yang tenang, halus, dan imersif.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'MadeAI Sky Seer');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Nuklir Power untuk Indonesia', 'https://energi-nu-madeai.lovable.app', NULL, 'learning', 'Platform edukasi tentang potensi energi nuklir bagi ketahanan energi nasional.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Nuklir Power untuk Indonesia');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'MadeAI Leetcoder Learning', 'https://ai.studio/apps/a0d8329e-40ee-4caf-b132-0c35599f1982?fullscreenApplet=true', NULL, 'learning', 'Prototipe interaktif pembelajaran algoritma dan penyelesaian kode bagi pengembang.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'MadeAI Leetcoder Learning');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Album Keluarga Ariel', 'https://usmansidar.lovable.app', NULL, 'lifestyle', 'Aplikasi web galeri foto dan kenangan hangat keluarga besar Ariel.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Album Keluarga Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Sosmed Kit Concept', 'https://arielcobakonek.lovable.app', NULL, 'tools', 'Eksplorasi konsep dan purwarupa kit media sosial modern.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Sosmed Kit Concept');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Buku Resep MadeAI', 'https://nasgormadeai.lovable.app', NULL, 'lifestyle', 'Resep nasi goreng khas MadeAI dikemas dalam estetika desain modern.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Buku Resep MadeAI');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Web Kucing Jalanan Makassar', 'https://ariel-cats-makassar.lovable.app', NULL, 'learning', 'Platform dokumentasi, aksi kepedulian, dan kisah kucing jalanan di Makassar.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Web Kucing Jalanan Makassar');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Bugis WebApp by MadeAI', 'https://bugis-bersama-madeai.lovable.app', NULL, 'learning', 'Menjembatani kebudayaan luhur Bugis dengan fungsionalitas digital modern.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Bugis WebApp by MadeAI');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Laporan Tentara Indonesia', 'https://madeaisoldier.lovable.app', NULL, 'learning', 'Visualisasi modern laporan kemanusiaan tentara perdamaian Indonesia di Timur Tengah.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Laporan Tentara Indonesia');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'NikahYukk', 'https://ai.studio/apps/0d48c1a5-f5e1-45c4-9cf7-862d377709d6?fullscreenApplet=true', NULL, 'lifestyle', 'Aplikasi edukasi persiapan pranikah dan pemahaman kehidupan pernikahan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'NikahYukk');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ayo Pulih Patah Hati', 'https://ai.studio/apps/c95862e7-65d6-4700-95dc-8c6ab6d35df7?fullscreenApplet=true', NULL, 'lifestyle', 'Pendamping digital berisi kutipan dan latihan mental pemulihan diri dari patah hati.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ayo Pulih Patah Hati');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Prototype Deteksi Asap Rokok', 'https://ai.studio/apps/33906306-9ac8-4e23-b955-a4a6e007a625?fullscreenApplet=true', NULL, 'tools', 'Prototipe penelitian deteksi asap berbasis kecerdasan buatan untuk menjaga kesehatan udara.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Prototype Deteksi Asap Rokok');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Trend Negeri Hub', 'https://madeaitrendswork.lovable.app', NULL, 'tools', 'Dasbor pemantau tren dinamika isu nasional secara visual.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Trend Negeri Hub');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Beda Kodok dan Katak', 'https://frog-toad-difference-gxdx.bolt.host', NULL, 'learning', 'Media presentasi ilmiah dan interaktif mengenai perbedaan kodok dan katak.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Beda Kodok dan Katak');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT '3D Training with Ariel', 'https://artriel-arch.github.io/3d=training-with-ariel.html', NULL, 'interactive', 'Simulasi dan latihan visual 3D interaktif yang interaktif dan dinamis.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = '3D Training with Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ambil Keterampilanmu', 'https://artriel-arch.github.io/ambil-keterampilanmu.html', NULL, 'learning', 'Rekomendasi terstruktur untuk mengukur dan meningkatkan keterampilan profesional.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ambil Keterampilanmu');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Anies Baswedan: Educated Politician', 'https://artriel-arch.github.io/anies-baswedan-educated-polician.html', NULL, 'learning', 'Analisis mendalam mengenai profil kepemimpinan politik berbasis edukasi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Anies Baswedan: Educated Politician');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Anxious-Avoidant Relationship', 'https://artriel-arch.github.io/anxious-avoidant-relationship-dijelaskan-oleh-ariel-dijelaskan-oleh-ariel.html', NULL, 'lifestyle', 'Penjelasan psikologis dinamika hubungan cemas-menghindar (Anxious-Avoidant).', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Anxious-Avoidant Relationship');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Ayo Disiplin Gini Caranya', 'https://artriel-arch.github.io/ayo-disiplin-gini-caranya-diajar-ariel.html', NULL, 'lifestyle', 'Langkah praktis melatih fokus dan membangun kedisiplinan hidup dari Ariel.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Ayo Disiplin Gini Caranya');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Baca Buku Guys', 'https://artriel-arch.github.io/baca-buku-guys.html', NULL, 'learning', 'Rekomendasi literatur pilihan untuk memperluas cakrawala berpikir anak muda.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Baca Buku Guys');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Bawa Mobil Simulator', 'https://artriel-arch.github.io/bawa-mobil.html', NULL, 'interactive', 'Simulasi belajar menyetir mobil dengan kendali keyboard interaktif.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Bawa Mobil Simulator');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Belajar dari 0 dengan Ariel', 'https://artriel-arch.github.io/belajar-dari-0-dengan-ariel.html', NULL, 'learning', 'Kurikulum panduan belajar terarah mengenai kecerdasan buatan, seni, dan kepenulisan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Belajar dari 0 dengan Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Belajar Kalimba Bareng Ariel', 'https://artriel-arch.github.io/belajar-main-kalimba-bareng-ariel.html', NULL, 'interactive', 'Instruksi memainkan lagu dengan alat musik Kalimba lewat visual yang menarik.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Belajar Kalimba Bareng Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Bulukumba Info', 'https://artriel-arch.github.io/bulukumba-info-ariel.html', NULL, 'learning', 'Pusat informasi adat, wisata, dan budaya khas Kabupaten Bulukumba.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Bulukumba Info');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Cara Telinga Mendengar', 'https://artriel-arch.github.io/cara-telinga-mendengar-ariel.html', NULL, 'learning', 'Presentasi fisiologi organ pendengaran manusia dalam merespons getaran suara.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Cara Telinga Mendengar');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Cek Kesehatan Ariel', 'https://artriel-arch.github.io/check-kesehatan-ariel.html', NULL, 'tools', 'Aplikasi sederhana screening kesehatan mandiri untuk memantau kondisi fisik.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Cek Kesehatan Ariel');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Delulu is Solulu', 'https://artriel-arch.github.io/delulu-is-solulu-ariel.html', NULL, 'lifestyle', 'Menyalurkan manifestasi delusi positif menjadi langkah pemecahan masalah.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Delulu is Solulu');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Fenomena Kedai Berdekatan', 'https://artriel-arch.github.io/fenomena-kedai-berdekatan.html', NULL, 'learning', 'Visualisasi teori lokasi bersaing (Hotelling Law) pada penempatan kedai makan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Fenomena Kedai Berdekatan');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Friend Zone Guide', 'https://artriel-arch.github.io/friend-zone-ariel.html', NULL, 'lifestyle', 'Analisis relasi pertemanan romantis dan cara keluar dari jebakan friend-zone.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Friend Zone Guide');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Git & Kecerdasan Sosial', 'https://artriel-arch.github.io/git-kecerdasan-sosial-dijelaskan.html', NULL, 'learning', 'Analogi unik kecerdasan emosional dan sosial menggunakan perintah dasar Git.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Git & Kecerdasan Sosial');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Hidroponik Shop', 'https://artriel-arch.github.io/hidroponik-shop-ariel.html', NULL, 'tools', 'Purwarupa antarmuka belanja perlengkapan tanaman hidroponik modern.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Hidroponik Shop');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Intermittent Fasting Anak Kos', 'https://artriel-arch.github.io/intermitten-fasting-anak-kos-ala-ariel.html', NULL, 'lifestyle', 'Metode berpuasa berkala yang efisien, sehat, ramah kantong anak kos.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Intermittent Fasting Anak Kos');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Jam Analog Cantik', 'https://artriel-arch.github.io/jam-analog.html', NULL, 'tools', 'Simulasi jam dinding analog menggunakan jarum berputar berbasis waktu sistem.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Jam Analog Cantik');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Karl Marx Dijelaskan Kembali', 'https://artriel-arch.github.io/karl-marx-dijelaskan-lagi.html', NULL, 'learning', 'Ulasan ringkas materi dialektika materialisme dan teori kritis Karl Marx.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Karl Marx Dijelaskan Kembali');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Katrol Lift Simulator', 'https://artriel-arch.github.io/katrollift.html', NULL, 'interactive', 'Simulator fisika gaya tegangan tali pada sistem katrol lift pengangkat beban.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Katrol Lift Simulator');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Kerja 9 to 5 Survival Guide', 'https://artriel-arch.github.io/kerja-9-to-5.html', NULL, 'lifestyle', 'Panduan bertahan dan menyeimbangkan karir kantoran dengan kesehatan mental.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Kerja 9 to 5 Survival Guide');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Konsep Kekuatan Islam', 'https://artriel-arch.github.io/konsep-kekuatan-islam.html', NULL, 'learning', 'Eksplorasi nilai kepemimpinan, persatuan, dan moralitas dalam ajaran Islam.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Konsep Kekuatan Islam');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Mencuri Layaknya Seniman', 'https://artriel-arch.github.io/mencuri-layaknya-seniman.html', NULL, 'lifestyle', 'Bagaimana meniru secara kreatif tanpa melakukan plagiarisme dari para kreator lain.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Mencuri Layaknya Seniman');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Mesin M-Shape Polymath', 'https://artriel-arch.github.io/mesin-mshape-polymath-ariel.html', NULL, 'tools', 'Sistem analisis untuk melatih spesialisasi ganda di berbagai bidang keahlian.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Mesin M-Shape Polymath');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Mind Palace Builder', 'https://artriel-arch.github.io/mind-palace-ariel.html', NULL, 'tools', 'Alat bantu menata ingatan menggunakan rute lokasi ruang fisik imajiner.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Mind Palace Builder');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Otak Manusia Dijelaskan', 'https://artriel-arch.github.io/otak-manusia-dijelaskan.html', NULL, 'learning', 'Penjelasan peta lobus otak dan hubungannya dengan perilaku manusia.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Otak Manusia Dijelaskan');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Panda Interactive Page', 'https://artriel-arch.github.io/panda.html', NULL, 'interactive', 'Desain web interaktif bertema panda dengan animasi CSS.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Panda Interactive Page');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Parenting Gen Alpha', 'https://artriel-arch.github.io/parenting-genAlpha.html', NULL, 'lifestyle', 'Metodologi mendidik anak kelahiran generasi Alpha yang dikelilingi teknologi.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Parenting Gen Alpha');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Pesan Ayah', 'https://artriel-arch.github.io/pesan-ayah-ariel.html', NULL, 'lifestyle', 'Nasihat-nasihat kebijaksanaan hidup yang menguatkan hati dari sang ayah.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Pesan Ayah');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Postal Mail Simulator', 'https://artriel-arch.github.io/postal.html', NULL, 'tools', 'Simulasi sistem alamat surat menyurat dan logistik pengiriman.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Postal Mail Simulator');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Power Law Distribution', 'https://artriel-arch.github.io/power-law.html', NULL, 'learning', 'Pemahaman konsep ketimpangan distribusi statistik hukum pangkat di masyarakat.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Power Law Distribution');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Rumus Cari Jodoh', 'https://artriel-arch.github.io/rumus-matematika-cari-jodoh.html', NULL, 'lifestyle', 'Menghitung kemungkinan menemukan pasangan ideal lewat parameter matematika.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Rumus Cari Jodoh');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Sabun Artrel Shop', 'https://artriel-arch.github.io/sabunaril.html', NULL, 'tools', 'Katalog toko sabun kecantikan herbal buatan rumahan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Sabun Artrel Shop');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Simulasi Kasir Toko', 'https://artriel-arch.github.io/simulasi-kasir-ariel.html', NULL, 'interactive', 'Game edukasi mencatat belanjaan dan menghitung kembalian uang.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Simulasi Kasir Toko');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Simulasi Distribusi Power Law', 'https://artriel-arch.github.io/simulasi-power-law.html', NULL, 'interactive', 'Simulator eksperimental model persebaran kekayaan secara acak.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Simulasi Distribusi Power Law');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Sketch Journaling', 'https://artriel-arch.github.io/sketch-journaling-ariel.html', NULL, 'learning', 'Inspirasi mendokumentasikan keseharian dalam paduan tulisan dan sketsa gambar.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Sketch Journaling');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Soremu Sore yang Bagus', 'https://artriel-arch.github.io/soremu-sore-yang-bagus.html', NULL, 'lifestyle', 'Karya eksperimental visual tentang keindahan senja penenang kepenatan.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Soremu Sore yang Bagus');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Tante J & Kopi Sianida', 'https://artriel-arch.github.io/tante-j-dan-kopi-sianida.html', NULL, 'interactive', 'Permainan teka-teki misteri pemecahan kasus meja kafe kopi bersianida.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Tante J & Kopi Sianida');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Traktor Sawah', 'https://artriel-arch.github.io/traktor.html', NULL, 'interactive', 'Simulasi mengemudikan traktor pembajak sawah sederhana.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Traktor Sawah');
INSERT INTO public.projects (title, url, drive_id, category, description, thumbnail_url)
SELECT 'Trik Otak Jadi Disiplin', 'https://artriel-arch.github.io/trick-otak-jadi-disiplin.html', NULL, 'lifestyle', 'Psikologi peretasan motivasi otak agar cepat terbiasa dengan disiplin harian.', NULL
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE title = 'Trik Otak Jadi Disiplin');

-- Seed Certificates
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'AI & Automation Specialist', 'SkillID', 'ai', 'sertifkat/AI SkillID/AI & AUTOMATION.pdf', 'Sertifikasi kompetensi dalam otomatisasi alur kerja dan kecerdasan buatan terapan.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'AI & Automation Specialist');
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'Developing with AI (Vibe Coding)', 'SkillID', 'ai', 'sertifkat/AI SkillID/DEVELOPING WITH AI VIBE CODING.pdf', 'Sertifikat keahlian menggunakan model AI untuk pemrograman kolaboratif/asisten coding.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'Developing with AI (Vibe Coding)');
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'Professional Skill in AI', 'SkillID', 'ai', 'sertifkat/AI SkillID/Professional Skill AI.pdf', 'Kompetensi tingkat lanjut penerapan AI pada solusi industri dan produktivitas harian.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'Professional Skill in AI');
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'Crash Course on Python', 'Google (via Coursera)', 'ai', 'sertifkat/AI Coursera/Coursera Crash Course on Python.pdf', 'Sertifikat dasar pemrograman berorientasi objek menggunakan Python.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'Crash Course on Python');
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'Kampanye Kreatif Skala Besar', 'Canva Academy', 'design', 'sertifkat/Canva/ariel-rifky-cahyadi-kampanye-kreatif-skala-besar-certificate.pdf', 'Sertifikat merancang media publikasi visual skala industri menggunakan platform Canva.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'Kampanye Kreatif Skala Besar');
INSERT INTO public.certificates (title, issuer, category, file_url, description)
SELECT 'Excel Sales Analytics Specialist', 'Microsoft Data Course', 'office', 'sertifkat/Speasialis Project Excel/Sales Analysis Excel/PROJECT CREATING SALES ANALYTICS IN EXCEL.pdf', 'Sertifikat kelulusan studi kasus visualisasi metrik bisnis penjualan dan analisis tren.'
WHERE NOT EXISTS (SELECT 1 FROM public.certificates WHERE title = 'Excel Sales Analytics Specialist');
