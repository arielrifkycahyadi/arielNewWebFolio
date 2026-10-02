const projects = [
  // --- GOOGLE DRIVE PORTFOLIOS (NEW CREATIVE SKILLSETS) ---
  {
    title: 'Meme Account Admin (Mr. Garbage)',
    url: 'https://drive.google.com/drive/folders/16NDhmqz54x062vo6gMBS5GTErYp_rsC5?usp=drive_link',
    driveId: '16NDhmqz54x062vo6gMBS5GTErYp_rsC5',
    category: 'creative',
    description: 'Pengalaman mengelola akun hiburan Mr. Garbage dengan mengubah ide/komentar netizen menjadi konten visual (meme/komik) viral berinteraksi tinggi.'
  },
  {
    title: 'Beginner Comic Illustrator Portfolio',
    url: 'https://drive.google.com/drive/folders/1wzPqL64XXezoN61tKUVPLUDIkTvSwFBm?usp=drive_link',
    driveId: '1wzPqL64XXezoN61tKUVPLUDIkTvSwFBm',
    category: 'creative',
    description: 'Koleksi komik strip orisinal, desain karakter, dan visual storytelling penarik interaksi dua arah dengan audiens.'
  },
  {
    title: 'Aspiring 2D Animator (Body Mechanics)',
    url: 'https://drive.google.com/drive/folders/1u-tQA6Pv2G7V0j9-BBxX_rPQya40f2rk?usp=drive_link',
    driveId: '1u-tQA6Pv2G7V0j9-BBxX_rPQya40f2rk',
    category: 'creative',
    description: 'Portofolio animasi 2D berfokus pada penguatan fondasi gerakan (12 Principles of Animation), Body Mechanics, dan Fluidity.'
  },
  {
    title: 'Junior Creative Designer Portfolio',
    url: 'https://drive.google.com/drive/folders/1X-at_Fsao37EeZjLA65MDO7Sc5KZpp0t?usp=drive_link',
    driveId: '1X-at_Fsao37EeZjLA65MDO7Sc5KZpp0t',
    category: 'creative',
    description: 'Desain grafis komersial (F&B) dan desain korporat fungsional berkepekaan visual tinggi.'
  },
  {
    title: 'Junior Multimedia Designer & Visual Artist',
    url: 'https://drive.google.com/drive/folders/1_MmADBU63MDlhpoGINYnQz7yJrBUe6fN?usp=drive_link',
    driveId: '1_MmADBU63MDlhpoGINYnQz7yJrBUe6fN',
    category: 'creative',
    description: 'Eksplorasi gaya visual Generalist, mulai dari estetika retro Pixel Art, Flat Design, hingga Fotografi Arsitektur.'
  },
  {
    title: 'Video Editor & PNGTuber Asset Creator',
    url: 'https://drive.google.com/drive/folders/174V-fH3mk1-m9gNxNyZMZ9_3QYAPY2zY?usp=drive_link',
    driveId: '174V-fH3mk1-m9gNxNyZMZ9_3QYAPY2zY',
    category: 'creative',
    description: 'Siklus produksi lengkap video \'Faceless Channel\': penulisan naskah, desain karakter & aset PNGTuber, hingga editing video dinamis.'
  },

  // --- BRANDING & KONSULTAN (NEW) ---
  {
    title: 'MADEAI Personal Branding Ariel',
    url: 'https://linktr.ee/madeaircun',
    category: 'branding',
    description: 'Direktori tautan resmi personal branding Ariel Usman (MADEAI).'
  },
  {
    title: 'OBBKdotCom: Homeless Media',
    url: 'https://www.instagram.com/obbkdotcom/',
    category: 'branding',
    description: 'Profil OBBKdotCom, layanan penyediaan dan konsultasi media kreatif independen.'
  },
  {
    title: 'NDNSanti: Web Developer Portfolio',
    url: 'https://ndnsanti19.github.io/listproject.html',
    category: 'branding',
    description: 'Portofolio kolaboratif jasa pengembangan situs web developer NDNSanti.'
  },

  // --- KARYA TULIS & OPINI (NEW) ---
  {
    title: 'Emosian dan Baca Pikiran Orang Tidak Membuatmu Cerdas',
    url: 'https://medium.com/@a.r.cusman05789/emosian-dan-baca-pikiran-orang-tidak-membuatmu-cerdas-384a8315f231',
    category: 'writing',
    description: 'Esai kritis mengenai miskonsepsi kecerdasan emosional dan fenomena pseudosains membaca pikiran orang lain.'
  },
  {
    title: 'Kapan Ariel Menikah? Analisis Sosial & Ekonomi',
    url: 'https://medium.com/@a.r.cusman05789/kapan-ariel-menikah-analisis-dengan-pendekatan-sosial-dan-ekonomi-5291498ce172',
    category: 'writing',
    description: 'Analisis semi-humor berdasar pendekatan sosiologi dan ekonomi mengenai waktu pernikahan ideal.'
  },
  {
    title: 'Oposisi Baik Benar ala Pandji Pragiwaksono',
    url: 'https://medium.com/@a.r.cusman05789/oposisi-baik-benar-ala-pandji-bukan-petualang-pragiwaksono-3e5e74acd848',
    category: 'writing',
    description: 'Opini tentang struktur oposisi politik yang sehat merujuk pada pemikiran komedian Pandji Pragiwaksono.'
  },
  {
    title: 'Kamu Sebenarnya Tidak Depresi',
    url: 'https://medium.com/@a.r.cusman05789/kamu-sebenarnya-tidak-depresi-dan-kenapa-depresi-harus-selalu-minta-tolong-a84aed85ff42',
    category: 'writing',
    description: 'Bahasan psikologis mengenai perbedaan kesedihan mendalam (sadness) dengan depresi klinis.'
  },
  {
    title: 'Ini Cerita Kamu Juga: Alibanana dan Kebun Yang...',
    url: 'https://www.wattpad.com/1629965156-ini-cerita-kamu-juga-alibanana-dan-kebun-yang',
    category: 'writing',
    description: 'Cerita pendek fiksi kolaboratif bersama MADEAI tentang Alibanana dan kebun misteriusnya.'
  },
  {
    title: 'Ini Cerita Kamu Juga: Permintaan Baharudin',
    url: 'https://www.wattpad.com/1629967684-ini-cerita-kamu-juga-permintaan-baharudin-1-2',
    category: 'writing',
    description: 'Naskah cerita fiksi berseri mengenai keinginan dan dilema hidup Baharudin.'
  },
  {
    title: 'Ini Cerita Kamu Juga: Tanda di Bawah Bendera',
    url: 'https://www.wattpad.com/1629968923-ini-cerita-kamu-juga-tanda-di-bawah-bendera-1-5',
    category: 'writing',
    description: 'Kisah fiksi perjuangan dan simbolisme bendera dalam serial kolaboratif.'
  },
  {
    title: 'Ini Cerita Kamu Juga: Kitab Yang Tidak Ada di Rak',
    url: 'https://www.wattpad.com/1629970605-ini-cerita-kamu-juga-kitab-yang-tidak-ada-di-rak',
    category: 'writing',
    description: 'Misteri pencarian manuskrip hilang dalam perpustakaan fiksi tersembunyi.'
  },
  {
    title: 'POV: Cewek Jepang Capek Hustle Culture & Cheat Code Qawwam',
    url: 'https://medium.com/@madeaircun/pov-lo-cewek-jepang-yang-udah-capek-sama-hustle-culture-terus-nemun-cheat-code-bernama-qawwam-dcbfa8d80f4e',
    category: 'writing',
    description: 'Perspektif kejenuhan budaya kerja Jepang (karoshi) dan solusi konsep kepemimpinan rumah tangga Islam (Qawwam).'
  },
  {
    title: 'Umbar Aib di Sosmed: Cari Solusi atau Sensasi?',
    url: 'https://medium.com/@madeaircun/umbar-aib-di-sosmed-katanya-cari-solusi-nyatanya-cuma-cari-sensasi-dan-bikin-tambah-sakit-0de46e2b6330',
    category: 'writing',
    description: 'Kritik sosial tentang tren curhat masalah pribadi secara terbuka di jagat maya.'
  },
  {
    title: 'Matinya Otoritas: Youtuber vs Media Arus Utama',
    url: 'https://medium.com/@madeaircun/matinya-otoritas-kenapa-kita-lebih-percaya-youtuber-daripada-media-arus-utama-bbf0b5266ea3',
    category: 'writing',
    description: 'Analisis pergeseran kepercayaan publik dari instansi media pers tradisional ke kreator video independen.'
  },
  {
    title: 'AI Nggak Akan Gantiin Kamu, Tapi...',
    url: 'https://medium.com/@madeaircun/ai-nggak-akan-gantiin-kamu-tapi-orang-yang-punya-otak-saat-ai-nya-mati-yang-bakal-gantiin-kamu-53f5619971f3',
    category: 'writing',
    description: 'Pandangan realistis tentang relevansi keahlian berpikir manusia orisinal di tengah maraknya era AI.'
  },
  {
    title: 'Dari Kokpit Pesawat Tempur ke Ruang Operasi',
    url: 'https://medium.com/@madeaircun/dari-kokpit-pesawat-tempur-ke-ruang-operasi-bagaimana-perang-dunia-ii-menyelamatkan-mata-kita-f0e4102e7fae',
    category: 'writing',
    description: 'Sejarah unik bagaimana inovasi kedirgantaraan militer PD II membantu kemajuan bedah optik mata.'
  },
  {
    title: 'Mitos Rumput Tetangga Lebih Hijau Pasca-Perceraian',
    url: 'https://medium.com/@madeaircun/mitos-rumput-tetangga-lebih-hijau-memahami-dinamika-hubungan-dan-market-value-pasca-perceraian-7e22787070ff',
    category: 'writing',
    description: 'Psikologi relasi dan penilaian nilai tawar sosial pasca-perpisahan pernikahan.'
  },
  {
    title: 'Kenapa Kita Merasa Hampa Justru Saat Paling Berguna?',
    url: 'https://medium.com/@madeaircun/kenapa-kita-merasa-hampa-justru-saat-paling-berguna-membedah-krisis-identitas-perempuan-modern-a34ca410ce6b',
    category: 'writing',
    description: 'Ulasan sosiologis krisis identitas eksistensial wanita karir di perkotaan.'
  },
  {
    title: 'Seni Menjadi Pecah: Perspektif Kintsugi',
    url: 'https://medium.com/@madeaircun/seni-menjadi-pecah-mengapa-retakan-di-hidupmu-justru-berharga-perspektif-kintsugi-psikologi-97863727bb23',
    category: 'writing',
    description: 'Mengintegrasikan seni perbaikan keramik emas Jepang (Kintsugi) dengan pemulihan trauma mental.'
  },
  {
    title: 'Kenapa Motivasi itu Penipu',
    url: 'https://medium.com/@madeaircun/kenapa-motivasi-itu-penipu-rahasia-membangun-mental-baja-saat-hidup-lagi-ngaco-f0e8aea00749',
    category: 'writing',
    description: 'Mengapa disiplin dan sistem jauh lebih berharga daripada luapan motivasi sesaat.'
  },
  {
    title: 'Seni Menibu Pasir: Isi Kepala Komputermu',
    url: 'https://medium.com/@madeaircun/seni-menipu-pasir-mengapa-anda-perlu-mengerti-isi-kepala-komputer-anda-4e0e1314acd1',
    category: 'writing',
    description: 'Edukasi perangkat keras bagaimana silikon (pasir) diubah menjadi prosesor super cerdas.'
  },
  {
    title: 'Fenomena Brain Rot & Algoritma Sosmed',
    url: 'https://medium.com/@madeaircun/fenomena-brain-rot-kenapa-hp-lo-bikin-lo-lupa-niat-awal-dan-cara-otak-lo-disuapin-algoritma-0391e6caf90e',
    category: 'writing',
    description: 'Dampak kecanduan stimulasi video pendek (TikTok/Reels) pada neurotransmitter dopamin otak.'
  },
  {
    title: 'Tuhan Bukan Tukang Pencet Tombol',
    url: 'https://medium.com/@madeaircun/tuhan-bukan-tukang-pencet-tombol-kenapa-realitas-kita-belum-shutdown-detik-ini-bb118fcc7bab',
    category: 'writing',
    description: 'Refleksi filosofis-teologis tentang eksistensi alam semesta dan pemeliharaan ilahi.'
  },
  {
    title: 'Benteng Terakhir: Institusi Keluarga di Era Digital',
    url: 'https://medium.com/@madeaircun/benteng-terakhir-mengapa-institusi-keluarga-bukan-sekadar-pajangan-di-era-digital-ebd812fce1d4',
    category: 'writing',
    description: 'Pentingnya pengokohan struktur terkecil masyarakat (keluarga) membendung arus informasi bebas.'
  },
  {
    title: 'Mencari Mizan di Tengah Hustle Culture',
    url: 'https://medium.com/@madeaircun/mencari-mizan-di-tengah-hustle-culture-mengapa-burnout-adalah-prank-terbesar-abad-ini-a4fb717d3929',
    category: 'writing',
    description: 'Konsep keseimbangan hidup (mizan) sebagai penangkal stres kerja berlebihan.'
  },
  {
    title: 'Menikah Itu Bukan Final Boss, Tapi Awal Bootcamp Rohani',
    url: 'https://medium.com/@madeaircun/menikah-itu-bukan-final-boss-tapi-awal-bootcamp-rohani-seni-berantem-yang-bikin-makin-cinta-8a57ba0f222f',
    category: 'writing',
    description: 'Seni mengelola konflik pasangan suami istri agar mempererat ikatan pernikahan.'
  },
  {
    title: 'Saat Terapi Saja Tidak Cukup: Seni Menyembuhkan Jiwa',
    url: 'https://medium.com/@madeaircun/saat-terapi-saja-tidak-cukup-mengapa-kita-perlu-melirik-kembali-seni-menyembuhkan-jiwa-ala-27bc8d2c36d1',
    category: 'writing',
    description: 'Pendekatan komplementer holistik spiritual untuk memulihkan luka batin terdalam.'
  },
  {
    title: 'Arsitektur Jiwa dalam Tradisi Islam',
    url: 'https://medium.com/@madeaircun/mengapa-psikologi-modern-terkadang-terasa-hambar-menengok-arsitektur-jiwa-dalam-tradisi-islam-3d18846731fd',
    category: 'writing',
    description: 'Membandingkan kognisi psikologi sekuler barat dengan anatomi kalbu dan akal dalam Islam.'
  },
  {
    title: 'Saat Iman Bertemu Kesehatan Mental',
    url: 'https://medium.com/@madeaircun/saat-iman-bertemu-kesehatan-mental-mengapa-berdoa-saja-terkadang-belum-cukup-7b632a62fee1',
    category: 'writing',
    description: 'Menjembatani ikhtiar medis/psikologis dengan kepasrahan doa spiritual.'
  },
  {
    title: 'Siapa yang Sebenarnya Menyetir Tubuh Anda?',
    url: 'https://medium.com/@madeaircun/siapa-yang-sebenarnya-menyetir-tubuh-anda-5cc35dde7aff',
    category: 'writing',
    description: 'Diskusi biologi saraf mengenai alam bawah sadar, refleks instingtif, dan kehendak bebas.'
  },
  {
    title: 'Kasus Chromebook Nadiem Makarim',
    url: 'https://medium.com/@madeaircun/kasus-chromebook-nadiem-makarim-korupsi-nyata-atau-kriminalisasi-kebijakan-867842b3cae5',
    category: 'writing',
    description: 'Telaah kritis kebijakan pengadaan laptop Chromebook di sekolah negeri di Indonesia.'
  },
  {
    title: 'Pengaruh Dominasi Konsumsi Infotainment',
    url: 'https://medium.com/@madeaircun/pengaruh-dominasi-konsumsi-infotainment-terhadap-kualitas-sumber-daya-manusia-dan-prospek-kemajuan-9015a91cdacf',
    category: 'writing',
    description: 'Dampak paparan konten gosip dan sensasi terhadap degradasi daya kritis masyarakat.'
  },
  {
    title: 'Kesehatan Mental: Tinjauan Historis, Kognitif & Holistik Islam',
    url: 'https://medium.com/@madeaircun/kesehatan-mental-dalam-perspektif-islam-tinjauan-historis-kognitif-dan-pendekatan-holistik-f852b6261c4f',
    category: 'writing',
    description: 'Sejarah pengobatan mental di masa kejayaan Islam (bimaristan) dan integrasi sains kognitif modern.'
  },
  {
    title: 'Saat Otak Menciut Karena Stres',
    url: 'https://medium.com/@madeaircun/saat-otak-menciut-karena-stres-apa-yang-sebenarnya-terjadi-di-dalam-kepala-kita-964789868d25',
    category: 'writing',
    description: 'Mekanisme biologis hormon kortisol merusak sel saraf di hipokampus otak.'
  },

  // --- ORIGINAL PROJECTS (arielrifkycahyadi.github.io) ---
  {
    title: 'Macneo by MadeAI',
    url: 'https://arielrifkycahyadi.github.io/neomac-by-madeai/',
    category: 'tools',
    description: 'Pengalaman web futuristik Macneo yang terinspirasi karya MadeAI dengan nuansa warna modern dan minimal.'
  },
  {
    title: 'Artriel Art Gallery',
    url: 'https://arielrifkycahyadi.github.io/artriel-art-gallery',
    category: 'interactive',
    description: 'Galeri seni Artriel yang menampilkan karya visual dengan antarmuka yang elegan dan responsif.'
  },
  {
    title: 'Xiaomi Pricelist by MadeAI',
    url: 'https://harga-mi-madeai.lovable.app',
    category: 'tools',
    description: 'Tampilan daftar harga ponsel Xiaomi yang rapi, bersih, dan efisien untuk membantu pencarian produk.'
  },
  {
    title: 'Play Kalimba with MadeAI',
    url: 'https://kalimba-madeai-learn.lovable.app',
    category: 'interactive',
    description: 'Aplikasi interaktif untuk belajar dan memainkan instrumen Kalimba virtual secara intuitif.'
  },
  {
    title: 'MadeAI Sky Seer',
    url: 'https://madeai-sky.lovable.app',
    category: 'tools',
    description: 'Antarmuka langit eksplorasi data secara visual yang tenang, halus, dan imersif.'
  },
  {
    title: 'Nuklir Power untuk Indonesia',
    url: 'https://energi-nu-madeai.lovable.app',
    category: 'learning',
    description: 'Platform edukasi tentang potensi energi nuklir bagi ketahanan energi nasional.'
  },
  {
    title: 'MadeAI Leetcoder Learning',
    url: 'https://ai.studio/apps/a0d8329e-40ee-4caf-b132-0c35599f1982?fullscreenApplet=true',
    category: 'learning',
    description: 'Prototipe interaktif pembelajaran algoritma dan penyelesaian kode bagi pengembang.'
  },
  {
    title: 'Album Keluarga Ariel',
    url: 'https://usmansidar.lovable.app',
    category: 'lifestyle',
    description: 'Aplikasi web galeri foto dan kenangan hangat keluarga besar Ariel.'
  },
  {
    title: 'Sosmed Kit Concept',
    url: 'https://arielcobakonek.lovable.app',
    category: 'tools',
    description: 'Eksplorasi konsep dan purwarupa kit media sosial modern.'
  },
  {
    title: 'Buku Resep MadeAI',
    url: 'https://nasgormadeai.lovable.app',
    category: 'lifestyle',
    description: 'Resep nasi goreng khas MadeAI dikemas dalam estetika desain modern.'
  },
  {
    title: 'Web Kucing Jalanan Makassar',
    url: 'https://ariel-cats-makassar.lovable.app',
    category: 'learning',
    description: 'Platform dokumentasi, aksi kepedulian, dan kisah kucing jalanan di Makassar.'
  },
  {
    title: 'Bugis WebApp by MadeAI',
    url: 'https://bugis-bersama-madeai.lovable.app',
    category: 'learning',
    description: 'Menjembatani kebudayaan luhur Bugis dengan fungsionalitas digital modern.'
  },
  {
    title: 'Laporan Tentara Indonesia',
    url: 'https://madeaisoldier.lovable.app',
    category: 'learning',
    description: 'Visualisasi modern laporan kemanusiaan tentara perdamaian Indonesia di Timur Tengah.'
  },
  {
    title: 'NikahYukk',
    url: 'https://ai.studio/apps/0d48c1a5-f5e1-45c4-9cf7-862d377709d6?fullscreenApplet=true',
    category: 'lifestyle',
    description: 'Aplikasi edukasi persiapan pranikah dan pemahaman kehidupan pernikahan.'
  },
  {
    title: 'Ayo Pulih Patah Hati',
    url: 'https://ai.studio/apps/c95862e7-65d6-4700-95dc-8c6ab6d35df7?fullscreenApplet=true',
    category: 'lifestyle',
    description: 'Pendamping digital berisi kutipan dan latihan mental pemulihan diri dari patah hati.'
  },
  {
    title: 'Prototype Deteksi Asap Rokok',
    url: 'https://ai.studio/apps/33906306-9ac8-4e23-b955-a4a6e007a625?fullscreenApplet=true',
    category: 'tools',
    description: 'Prototipe penelitian deteksi asap berbasis kecerdasan buatan untuk menjaga kesehatan udara.'
  },
  {
    title: 'Trend Negeri Hub',
    url: 'https://madeaitrendswork.lovable.app',
    category: 'tools',
    description: 'Dasbor pemantau tren dinamika isu nasional secara visual.'
  },
  {
    title: 'Beda Kodok dan Katak',
    url: 'https://frog-toad-difference-gxdx.bolt.host',
    category: 'learning',
    description: 'Media presentasi ilmiah dan interaktif mengenai perbedaan kodok dan katak.'
  },

  // --- ARTRIEL-ARCH.GITHUB.IO PROJECTS ---
  {
    title: '3D Training with Ariel',
    url: 'https://artriel-arch.github.io/3d=training-with-ariel.html',
    category: 'interactive',
    description: 'Simulasi dan latihan visual 3D interaktif yang interaktif dan dinamis.'
  },
  {
    title: 'Ambil Keterampilanmu',
    url: 'https://artriel-arch.github.io/ambil-keterampilanmu.html',
    category: 'learning',
    description: 'Rekomendasi terstruktur untuk mengukur dan meningkatkan keterampilan profesional.'
  },
  {
    title: 'Anies Baswedan: Educated Politician',
    url: 'https://artriel-arch.github.io/anies-baswedan-educated-polician.html',
    category: 'learning',
    description: 'Analisis mendalam mengenai profil kepemimpinan politik berbasis edukasi.'
  },
  {
    title: 'Anxious-Avoidant Relationship',
    url: 'https://artriel-arch.github.io/anxious-avoidant-relationship-dijelaskan-oleh-ariel-dijelaskan-oleh-ariel.html',
    category: 'lifestyle',
    description: 'Penjelasan psikologis dinamika hubungan cemas-menghindar (Anxious-Avoidant).'
  },
  {
    title: 'Ayo Disiplin Gini Caranya',
    url: 'https://artriel-arch.github.io/ayo-disiplin-gini-caranya-diajar-ariel.html',
    category: 'lifestyle',
    description: 'Langkah praktis melatih fokus dan membangun kedisiplinan hidup dari Ariel.'
  },
  {
    title: 'Baca Buku Guys',
    url: 'https://artriel-arch.github.io/baca-buku-guys.html',
    category: 'learning',
    description: 'Rekomendasi literatur pilihan untuk memperluas cakrawala berpikir anak muda.'
  },
  {
    title: 'Bawa Mobil Simulator',
    url: 'https://artriel-arch.github.io/bawa-mobil.html',
    category: 'interactive',
    description: 'Simulasi belajar menyetir mobil dengan kendali keyboard interaktif.'
  },
  {
    title: 'Belajar dari 0 dengan Ariel',
    url: 'https://artriel-arch.github.io/belajar-dari-0-dengan-ariel.html',
    category: 'learning',
    description: 'Kurikulum panduan belajar terarah mengenai kecerdasan buatan, seni, dan kepenulisan.'
  },
  {
    title: 'Belajar Kalimba Bareng Ariel',
    url: 'https://artriel-arch.github.io/belajar-main-kalimba-bareng-ariel.html',
    category: 'interactive',
    description: 'Instruksi memainkan lagu dengan alat musik Kalimba lewat visual yang menarik.'
  },
  {
    title: 'Bulukumba Info',
    url: 'https://artriel-arch.github.io/bulukumba-info-ariel.html',
    category: 'learning',
    description: 'Pusat informasi adat, wisata, dan budaya khas Kabupaten Bulukumba.'
  },
  {
    title: 'Cara Telinga Mendengar',
    url: 'https://artriel-arch.github.io/cara-telinga-mendengar-ariel.html',
    category: 'learning',
    description: 'Presentasi fisiologi organ pendengaran manusia dalam merespons getaran suara.'
  },
  {
    title: 'Cek Kesehatan Ariel',
    url: 'https://artriel-arch.github.io/check-kesehatan-ariel.html',
    category: 'tools',
    description: 'Aplikasi sederhana screening kesehatan mandiri untuk memantau kondisi fisik.'
  },
  {
    title: 'Delulu is Solulu',
    url: 'https://artriel-arch.github.io/delulu-is-solulu-ariel.html',
    category: 'lifestyle',
    description: 'Menyalurkan manifestasi delusi positif menjadi langkah pemecahan masalah.'
  },
  {
    title: 'Fenomena Kedai Berdekatan',
    url: 'https://artriel-arch.github.io/fenomena-kedai-berdekatan.html',
    category: 'learning',
    description: 'Visualisasi teori lokasi bersaing (Hotelling Law) pada penempatan kedai makan.'
  },
  {
    title: 'Friend Zone Guide',
    url: 'https://artriel-arch.github.io/friend-zone-ariel.html',
    category: 'lifestyle',
    description: 'Analisis relasi pertemanan romantis dan cara keluar dari jebakan friend-zone.'
  },
  {
    title: 'Git & Kecerdasan Sosial',
    url: 'https://artriel-arch.github.io/git-kecerdasan-sosial-dijelaskan.html',
    category: 'learning',
    description: 'Analogi unik kecerdasan emosional dan sosial menggunakan perintah dasar Git.'
  },
  {
    title: 'Hidroponik Shop',
    url: 'https://artriel-arch.github.io/hidroponik-shop-ariel.html',
    category: 'tools',
    description: 'Purwarupa antarmuka belanja perlengkapan tanaman hidroponik modern.'
  },
  {
    title: 'Intermittent Fasting Anak Kos',
    url: 'https://artriel-arch.github.io/intermitten-fasting-anak-kos-ala-ariel.html',
    category: 'lifestyle',
    description: 'Metode berpuasa berkala yang efisien, sehat, ramah kantong anak kos.'
  },
  {
    title: 'Jam Analog Cantik',
    url: 'https://artriel-arch.github.io/jam-analog.html',
    category: 'tools',
    description: 'Simulasi jam dinding analog menggunakan jarum berputar berbasis waktu sistem.'
  },
  {
    title: 'Karl Marx Dijelaskan Kembali',
    url: 'https://artriel-arch.github.io/karl-marx-dijelaskan-lagi.html',
    category: 'learning',
    description: 'Ulasan ringkas materi dialektika materialisme dan teori kritis Karl Marx.'
  },
  {
    title: 'Katrol Lift Simulator',
    url: 'https://artriel-arch.github.io/katrollift.html',
    category: 'interactive',
    description: 'Simulator fisika gaya tegangan tali pada sistem katrol lift pengangkat beban.'
  },
  {
    title: 'Kerja 9 to 5 Survival Guide',
    url: 'https://artriel-arch.github.io/kerja-9-to-5.html',
    category: 'lifestyle',
    description: 'Panduan bertahan dan menyeimbangkan karir kantoran dengan kesehatan mental.'
  },
  {
    title: 'Konsep Kekuatan Islam',
    url: 'https://artriel-arch.github.io/konsep-kekuatan-islam.html',
    category: 'learning',
    description: 'Eksplorasi nilai kepemimpinan, persatuan, dan moralitas dalam ajaran Islam.'
  },
  {
    title: 'Mencuri Layaknya Seniman',
    url: 'https://artriel-arch.github.io/mencuri-layaknya-seniman.html',
    category: 'lifestyle',
    description: 'Bagaimana meniru secara kreatif tanpa melakukan plagiarisme dari para kreator lain.'
  },
  {
    title: 'Mesin M-Shape Polymath',
    url: 'https://artriel-arch.github.io/mesin-mshape-polymath-ariel.html',
    category: 'tools',
    description: 'Sistem analisis untuk melatih spesialisasi ganda di berbagai bidang keahlian.'
  },
  {
    title: 'Mind Palace Builder',
    url: 'https://artriel-arch.github.io/mind-palace-ariel.html',
    category: 'tools',
    description: 'Alat bantu menata ingatan menggunakan rute lokasi ruang fisik imajiner.'
  },
  {
    title: 'Otak Manusia Dijelaskan',
    url: 'https://artriel-arch.github.io/otak-manusia-dijelaskan.html',
    category: 'learning',
    description: 'Penjelasan peta lobus otak dan hubungannya dengan perilaku manusia.'
  },
  {
    title: 'Panda Interactive Page',
    url: 'https://artriel-arch.github.io/panda.html',
    category: 'interactive',
    description: 'Desain web interaktif bertema panda dengan animasi CSS.'
  },
  {
    title: 'Parenting Gen Alpha',
    url: 'https://artriel-arch.github.io/parenting-genAlpha.html',
    category: 'lifestyle',
    description: 'Metodologi mendidik anak kelahiran generasi Alpha yang dikelilingi teknologi.'
  },
  {
    title: 'Pesan Ayah',
    url: 'https://artriel-arch.github.io/pesan-ayah-ariel.html',
    category: 'lifestyle',
    description: 'Nasihat-nasihat kebijaksanaan hidup yang menguatkan hati dari sang ayah.'
  },
  {
    title: 'Postal Mail Simulator',
    url: 'https://artriel-arch.github.io/postal.html',
    category: 'tools',
    description: 'Simulasi sistem alamat surat menyurat dan logistik pengiriman.'
  },
  {
    title: 'Power Law Distribution',
    url: 'https://artriel-arch.github.io/power-law.html',
    category: 'learning',
    description: 'Pemahaman konsep ketimpangan distribusi statistik hukum pangkat di masyarakat.'
  },
  {
    title: 'Rumus Cari Jodoh',
    url: 'https://artriel-arch.github.io/rumus-matematika-cari-jodoh.html',
    category: 'lifestyle',
    description: 'Menghitung kemungkinan menemukan pasangan ideal lewat parameter matematika.'
  },
  {
    title: 'Sabun Artrel Shop',
    url: 'https://artriel-arch.github.io/sabunaril.html',
    category: 'tools',
    description: 'Katalog toko sabun kecantikan herbal buatan rumahan.'
  },
  {
    title: 'Simulasi Kasir Toko',
    url: 'https://artriel-arch.github.io/simulasi-kasir-ariel.html',
    category: 'interactive',
    description: 'Game edukasi mencatat belanjaan dan menghitung kembalian uang.'
  },
  {
    title: 'Simulasi Distribusi Power Law',
    url: 'https://artriel-arch.github.io/simulasi-power-law.html',
    category: 'interactive',
    description: 'Simulator eksperimental model persebaran kekayaan secara acak.'
  },
  {
    title: 'Sketch Journaling',
    url: 'https://artriel-arch.github.io/sketch-journaling-ariel.html',
    category: 'learning',
    description: 'Inspirasi mendokumentasikan keseharian dalam paduan tulisan dan sketsa gambar.'
  },
  {
    title: 'Soremu Sore yang Bagus',
    url: 'https://artriel-arch.github.io/soremu-sore-yang-bagus.html',
    category: 'lifestyle',
    description: 'Karya eksperimental visual tentang keindahan senja penenang kepenatan.'
  },
  {
    title: 'Tante J & Kopi Sianida',
    url: 'https://artriel-arch.github.io/tante-j-dan-kopi-sianida.html',
    category: 'interactive',
    description: 'Permainan teka-teki misteri pemecahan kasus meja kafe kopi bersianida.'
  },
  {
    title: 'Traktor Sawah',
    url: 'https://artriel-arch.github.io/traktor.html',
    category: 'interactive',
    description: 'Simulasi mengemudikan traktor pembajak sawah sederhana.'
  },
  {
    title: 'Trik Otak Jadi Disiplin',
    url: 'https://artriel-arch.github.io/trick-otak-jadi-disiplin.html',
    category: 'lifestyle',
    description: 'Psikologi peretasan motivasi otak agar cepat terbiasa dengan disiplin harian.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projects;
}
