const appList = [
  { title: 'Macneo-by-madeai-artriel', url: 'https://arielrifkycahyadi.github.io/neomac-by-madeai/', description: 'Pengalaman web futuristik Macneo yang terinspirasi karya MadeAI dengan nuansa warna modern dan minimal.' },
  { title: 'Artriel Art Gallery', url: 'https://arielrifkycahyadi.github.io/artriel-art-gallery', description: 'Galeri seni Artriel yang menampilkan karya visual dengan antarmuka yang elegan dan responsif.' },
  { title: 'Madeai Pricelist Xiaomi Phone', url: 'https://harga-mi-madeai.lovable.app', description: 'Tampilan harga Xiaomi yang rapi dan efisien, dibuat untuk membantu pengguna menemukan informasi produk cepat.' },
  { title: 'Play Kalimba with Madeai', url: 'https://kalimba-madeai-learn.lovable.app', description: 'Aplikasi interaktif untuk belajar dan memainkan Kalimba dengan panduan MadeAI yang intuitif.' },
  { title: 'Madeai Sky Seer', url: 'https://madeai-sky.lovable.app', description: 'Antarmuka langit futuristik yang memberikan sensasi eksplorasi data secara halus dan immersif.' },
  { title: 'Nuklir Power untuk Indonesia', url: 'https://energi-nu-madeai.lovable.app', description: 'Platform edukasi tentang energi nuklir dan potensinya untuk kemajuan teknologi Indonesia modern.' },
  { title: 'Madeai - leetcoderLearning', url: 'https://ai.studio/apps/a0d8329e-40ee-4caf-b132-0c35599f1982?fullscreenApplet=true', description: 'Prototipe pembelajaran algoritma dan pemrograman dari MadeAI untuk pengembang yang haus tantangan.' },
  { title: 'Album Keluarga Ariel', url: 'https://usmansidar.lovable.app', description: 'Galeri kenangan keluarga dalam pengalaman web yang hangat dan mudah dinavigasi.' },
  { title: 'Sosmed Kit Test Concept Ariel', url: 'https://arielcobakonek.lovable.app', description: 'Konsep kit sosial media untuk eksplorasi interaksi dan prototype pengalaman pengguna.' },
  { title: 'Buku Resep Madeai', url: 'https://nasgormadeai.lovable.app', description: 'Resep kuliner MadeAI dikemas dengan gaya modern dan presentasi visual yang menarik.' },
  { title: 'Web Kucing Jalanan Makassar', url: 'https://ariel-cats-makassar.lovable.app', description: 'Platform dokumentasi kucing jalanan untuk narasi sosial dan pengalaman visual penuh empati.' },
  { title: 'Test Prototype Angga', url: null, description: 'Visual placeholder yang mewakili prototipe eksperimental yang sedang dikembangkan.' },
  { title: 'Bugis WebApp by Madeai', url: 'https://bugis-bersama-madeai.lovable.app', description: 'Aplikasi komunitas Bugis yang memadukan budaya dengan logika digital MadeAI.' },
  { title: 'Laporan Korban Tentara Indonesia di Timur Tengah', url: 'https://madeaisoldier.lovable.app', description: 'Dokumentasi laporan yang disajikan dalam format modern tanpa mengurangi keseriusan konten.' },
  { title: 'NikahYukk - Web untuk kamu yang penasaran soal nikah', url: 'https://ai.studio/apps/0d48c1a5-f5e1-45c4-9cf7-862d377709d6?fullscreenApplet=true', description: 'Sebuah interface edukasi ringan untuk informasi pernikahan dengan pendekatan MadeAI.' },
  { title: 'Ayo Pulih Patah Hati by Madeai', url: 'https://ai.studio/apps/c95862e7-65d6-4700-95dc-8c6ab6d35df7?fullscreenApplet=true', description: 'Platform penyemangat pulih dari patah hati dengan interface yang lembut namun futuristik.' },
  { title: 'Prototype App untuk Lanjutan Penelitian Deteksi Asap Rokok Elektro', url: 'https://ai.studio/apps/33906306-9ac8-4e23-b955-a4a6e007a625?fullscreenApplet=true', description: 'Prototype penelitian deteksi asap dan keamanan udara berbasis teknologi MadeAI.' },
  { title: 'Trend Negeri Hub by Madeai', url: 'https://madeaitrendswork.lovable.app', description: 'Dashboard tren modern yang menampilkan pola informasi dengan visual yang tenang dan profesional.' },
  { title: 'Beda Kodok dan Katak Madeai', url: 'https://frog-toad-difference-gxdx.bolt.host', description: 'Skripsi interaktif tentang perbedaan kodok dan katak, dipresentasikan secara minimal dan bersih.' }
];

const appGrid = document.getElementById('appGrid');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailLink = document.getElementById('detailLink');
const exploreBtn = document.getElementById('exploreBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const gameScoreEl = document.getElementById('gameScore');
const gameStatus = document.getElementById('gameStatus');
const catStage = document.getElementById('catStage');
const feedButton = document.getElementById('feedButton');
const treatButton = document.getElementById('treatButton');
const resetButton = document.getElementById('resetButton');

let activeIndex = null;
let score = 0;
let feeding = false;

const rootStyle = document.documentElement.style;
const animateDynamicBackground = () => {
  const time = performance.now() * 0.00012;
  const x1 = 18 + Math.sin(time * 1.2) * 6;
  const y1 = 12 + Math.cos(time * 0.9) * 5;
  const x2 = 82 + Math.cos(time * 1.1) * 7;
  const y2 = 86 + Math.sin(time * 0.8) * 6;
  const hue = 205 + Math.sin(time * 0.7) * 22;
  rootStyle.setProperty('--bg-x1', `${x1}%`);
  rootStyle.setProperty('--bg-y1', `${y1}%`);
  rootStyle.setProperty('--bg-x2', `${x2}%`);
  rootStyle.setProperty('--bg-y2', `${y2}%`);
  rootStyle.setProperty('--bg-angle', `${180 + Math.sin(time * 0.4) * 18}deg`);
  rootStyle.setProperty('--light-cyan', `hsl(${hue}, 94%, 74%)`);
  rootStyle.setProperty('--muted-blue', `hsl(${hue - 28}, 47%, 64%)`);
  requestAnimationFrame(animateDynamicBackground);
};

const renderCards = () => {
  appGrid.innerHTML = '';
  appList.forEach((app, index) => {
    const card = document.createElement('article');
    card.className = 'app-card';
    card.dataset.index = index;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="app-card__icon" aria-hidden="true">🔷</div>
      <h3>${app.title}</h3>
      <div class="app-meta">
        <span>${app.url ? 'Live URL' : 'Coming Soon'}</span>
        <span class="app-url">${app.url ? app.url : 'Placeholder project'}</span>
      </div>
    `;
    card.addEventListener('click', () => selectApp(index));
    card.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectApp(index);
      }
    });
    appGrid.appendChild(card);
  });
};

const updateDetailPanel = (index) => {
  const app = appList[index];
  detailTitle.textContent = app.title;
  detailText.textContent = app.description;
  if (app.url) {
    detailLink.href = app.url;
    detailLink.textContent = 'Buka Aplikasi';
    detailLink.classList.remove('disabled');
    detailLink.setAttribute('aria-disabled', 'false');
  } else {
    detailLink.href = '#';
    detailLink.textContent = 'Sedang Dalam Pengembangan';
    detailLink.classList.add('disabled');
    detailLink.setAttribute('aria-disabled', 'true');
  }
  detailLink.setAttribute('aria-label', `Buka ${app.title}`);
  highlightActiveCard(index);
};

const highlightActiveCard = (selectedIndex) => {
  activeIndex = selectedIndex;
  Array.from(appGrid.children).forEach((card, index) => {
    card.dataset.active = index === selectedIndex ? 'true' : 'false';
  });
};

const selectApp = (index) => {
  updateDetailPanel(index);
  window.location.hash = `app-${index}`;
};

const getHashIndex = () => {
  const hash = window.location.hash.replace('#app-', '');
  const parsed = Number(hash);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < appList.length ? parsed : null;
};

const ensureNavigationState = () => {
  const hashIndex = getHashIndex();
  if (hashIndex !== null) {
    updateDetailPanel(hashIndex);
  } else {
    detailTitle.textContent = 'Selamat Datang di MadeAI Ariel';
    detailText.textContent = 'Pilih aplikasi di gallery agar informasi tampil tanpa reload. Setiap tautan aktif membawa Anda ke platform yang benar.';
    detailLink.href = '#';
    detailLink.textContent = 'Pilih aplikasi untuk membuka';
    detailLink.classList.add('disabled');
    detailLink.setAttribute('aria-disabled', 'true');
    Array.from(appGrid.children).forEach((card) => { card.dataset.active = 'false'; });
  }
};

const createFoodElement = (x, y) => {
  const food = document.createElement('div');
  food.className = 'food';
  food.style.left = `${x}px`;
  food.style.top = `${y}px`;
  catStage.appendChild(food);
  requestAnimationFrame(() => {
    food.style.opacity = '1';
    food.style.transform = 'translate(-50%, 0) scale(1)';
  });
  return food;
};

const animateFood = (food, delay = 0) => {
  const endY = catStage.clientHeight - 44;
  const startLeft = parseFloat(food.style.left);
  const startTop = parseFloat(food.style.top);
  const duration = 700;
  const startTime = performance.now() + delay;

  const step = (time) => {
    const elapsed = Math.max(0, time - startTime);
    const progress = Math.min(elapsed / duration, 1);
    const currentTop = startTop + (endY - startTop) * progress;
    const wobble = Math.sin(progress * Math.PI * 2) * 10;
    food.style.top = `${currentTop}px`;
    food.style.left = `${startLeft + wobble}px`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      food.style.opacity = '0';
      setTimeout(() => { food.remove(); }, 220);
    }
  };

  requestAnimationFrame(step);
};

const feedCat = (bonus = 1) => {
  if (feeding) return;
  feeding = true;
  const stageWidth = catStage.clientWidth;
  const startX = stageWidth * 0.5;
  const startY = 24;
  const food = createFoodElement(startX, startY);
  animateFood(food);
  score += bonus;
  gameScoreEl.textContent = score;
  gameStatus.textContent = `Skor: ${score} | ${bonus > 1 ? 'Bonus energi!' : 'Fat Cat diberi makan.'}`;
  setTimeout(() => { feeding = false; }, 800);
};

const resetGame = () => {
  score = 0;
  gameScoreEl.textContent = score;
  gameStatus.textContent = 'Skor direset. Mulai lagi untuk memberi makan Fat Cat!';
};

exploreBtn.addEventListener('click', () => {
  appGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

learnMoreBtn.addEventListener('click', () => {
  if (activeIndex !== null) {
    window.location.hash = `app-${activeIndex}`;
    return;
  }
  document.getElementById('detailPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

feedButton.addEventListener('click', () => feedCat(1));
treatButton.addEventListener('click', () => feedCat(3));
resetButton.addEventListener('click', resetGame);
window.addEventListener('hashchange', ensureNavigationState);

animateDynamicBackground();
renderCards();
ensureNavigationState();
