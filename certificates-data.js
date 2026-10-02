/**
 * Ariel Usman - Master Certificates Data
 */
const defaultCertificates = [
  // AI & Otomasi
  {
    title: 'AI & Automation Specialist',
    issuer: 'SkillID',
    category: 'ai',
    path: 'sertifkat/AI SkillID/AI & AUTOMATION.pdf',
    desc: 'Sertifikasi kompetensi dalam otomatisasi alur kerja dan kecerdasan buatan terapan.'
  },
  {
    title: 'Developing with AI (Vibe Coding)',
    issuer: 'SkillID',
    category: 'ai',
    path: 'sertifkat/AI SkillID/DEVELOPING WITH AI VIBE CODING.pdf',
    desc: 'Sertifikat keahlian menggunakan model AI untuk pemrograman kolaboratif/asisten coding.'
  },
  {
    title: 'Professional Skill in AI',
    issuer: 'SkillID',
    category: 'ai',
    path: 'sertifkat/AI SkillID/Professional Skill AI.pdf',
    desc: 'Kompetensi tingkat lanjut penerapan AI pada solusi industri dan produktivitas harian.'
  },
  {
    title: 'Crash Course on Python',
    issuer: 'Google (via Coursera)',
    category: 'ai',
    path: 'sertifkat/AI Coursera/Coursera Crash Course on Python.pdf',
    desc: 'Sertifikat dasar pemrograman berorientasi objek menggunakan Python.'
  },
  {
    title: 'AI for Content Marketing',
    issuer: 'Professional AI Course',
    category: 'ai',
    path: 'sertifkat/Profesional AI/Artificial Intelligence/AI FOR CONTENT MARKETING.pdf',
    desc: 'Pemanfaatan model bahasa besar untuk branding dan marketing visual.'
  },

  // Canva & Desain
  {
    title: 'Kampanye Kreatif Skala Besar',
    issuer: 'Canva Academy',
    category: 'design',
    path: 'sertifkat/Canva/ariel-rifky-cahyadi-kampanye-kreatif-skala-besar-certificate.pdf',
    desc: 'Sertifikat merancang media publikasi visual skala industri menggunakan platform Canva.'
  },
  {
    title: 'Membuat Konten Visual Memikat',
    issuer: 'Canva Academy',
    category: 'design',
    path: 'sertifkat/Canva/ariel-rifky-cahyadi-buat-konten-memikat-certificate.pdf',
    desc: 'Kemahiran menciptakan aset media sosial penarik keterlibatan visual audiens.'
  },
  {
    title: 'Perkenalan Aplikasi Visual Canva',
    issuer: 'Canva Academy',
    category: 'design',
    path: 'sertifkat/Canva/ariel-rifky-cahyadi-perkenalan-aplikasi-visual-canva-certificate.pdf',
    desc: 'Sertifikat penguasaan antarmuka dasar dan komponen desain visual.'
  },
  {
    title: 'Digital Illustration - Mythical Beasts',
    issuer: 'Digital Art Studio',
    category: 'design',
    path: 'sertifkat/Illustrasi Digital/Gambar Mahluk Fantasi/certificate-mythical-beasts-bikin-makhluk-fantasi-67efb75e337a602c4201c29a.pdf',
    desc: 'Sertifikat ilustrasi digital spesialisasi desain makhluk fantasi.'
  },
  {
    title: 'Mobile Video Creation for TikTok & Instagram',
    issuer: 'Domestika',
    category: 'design',
    path: 'sertifkat/Domestika/Mobile Video Creation for TikTok and Instagram/Domestika Mobile Video Creation for TikTok and Instagram.pdf',
    desc: 'Sertifikasi internasional dalam teknik perekaman, transisi, dan editing video pendek.'
  },

  // Office & Excel
  {
    title: 'Excel Sales Analytics Specialist',
    issuer: 'Microsoft Data Course',
    category: 'office',
    path: 'sertifkat/Speasialis Project Excel/Sales Analysis Excel/PROJECT CREATING SALES ANALYTICS IN EXCEL.pdf',
    desc: 'Sertifikat kelulusan studi kasus visualisasi metrik bisnis penjualan dan analisis tren.'
  },
  {
    title: 'Excel Sales Dashboard Specialist',
    issuer: 'Microsoft Data Course',
    category: 'office',
    path: 'sertifkat/Speasialis Project Excel/Sales Dashboard/PROJECT CREATING SALES DASHBOARD IN EXCEL.pdf',
    desc: 'Perancangan dasbor metrik dinamis menggunakan Excel formulas, pivot tables, dan charts.'
  },
  {
    title: 'Microsoft Word Advanced Document Elements',
    issuer: 'Office Certified',
    category: 'office',
    path: 'sertifkat/Office Dasar/Microsoft Word/CREATE CUSTOM DOCUMENT ELEMENTS AND ADVANCED FEATURES IN MICROSOFT WORD.pdf',
    desc: 'Sertifikat pengolahan dokumen bisnis berskala besar secara profesional.'
  },

  // Akademik & Sekolah
  {
    title: 'Praktek Kerja Lapangan (PKL) DPRD',
    issuer: 'DPRD Office',
    category: 'edu',
    path: 'sertifkat/Sertifikat Sekolah/PKL DPRD.pdf',
    desc: 'Sertifikat penghargaan penyelesaian praktek kerja lapangan di lingkungan sekretariat DPRD.'
  },
  {
    title: 'Becoming a Teacher & Educational Methodology',
    issuer: 'Pendidikan IT Center',
    category: 'edu',
    path: 'sertifkat/Pendidikan/BECOMING A TEACHER.pdf',
    desc: 'Pelatihan dasar mengajar dan menyusun kurikulum pengajaran IT.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = defaultCertificates;
}
