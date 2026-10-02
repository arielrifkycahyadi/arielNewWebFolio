const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxAuthor = document.getElementById('lightboxAuthor');
const lightboxCategory = document.getElementById('lightboxCategory');
const catPortrait = document.getElementById('catPortrait');
const catFace = document.getElementById('catFace');
const catMeterText = document.getElementById('catMeterText');
const catMeterFill = document.getElementById('catMeterFill');
const feedButton = document.getElementById('feedButton');
const cursor = document.querySelector('.cursor');

const artworks = [
  { title: 'Neural Horizon', category: 'Futurist', author: 'Artriel', filename: 'Background.png', description: 'Soft neon gradients meet a sleek architectural horizon for a futuristic digital study.' },
  { title: 'Echo Byte', category: 'Tech', author: 'Artriel', filename: 'Among Us YT Thumb Real.png', description: 'A compact pixel-driven composition built for fast-paced neon energy.' },
  { title: 'Moonlit Monochrome', category: 'Minimalist', author: 'Artriel', filename: 'Amelia.png', description: 'Calm forms and subtle contrast create an elegant digital stillness.' },
  { title: 'Haze Interface', category: 'Futurist', author: 'Artriel', filename: 'Ariel gaga.png', description: 'An angular, glowing interface concept with an immersive low-light atmosphere.' },
  { title: 'Pulse Grid', category: 'Tech', author: 'Artriel', filename: 'Ariel-Tes.png', description: 'A rhythmic tech tableau of sharp lines and data-inspired arrival.' },
  { title: 'Soft Vector', category: 'Minimalist', author: 'Artriel', filename: 'Ariel-w.png', description: 'Minimal geometric balance with gentle cyan accents and clear white space.' },
  { title: 'Nebula Drift', category: 'Futurist', author: 'Artriel', filename: 'ASSSSHHUUUWWW1.png', description: 'A moody futuristic vista with layered texture and depth.' },
  { title: 'Clarity Study', category: 'Minimalist', author: 'Artriel', filename: 'Agungw.png', description: 'Strict minimalist form paired with polished surface details and breathability.' },
  { title: 'Urban Code', category: 'Tech', author: 'Artriel', filename: 'Baju Bodo 1.png', description: 'A sleek digital mesh built around an intense cyberpunk palette.' },
  { title: 'Dream Frame', category: 'Minimalist', author: 'Artriel', filename: 'Coloring.png', description: 'Soft abstract shapes and clean composition for an airy gallery moment.' },
  { title: 'Pulse Circuit', category: 'Tech', author: 'Artriel', filename: 'COba.png', description: 'Sharp vectors and a high-definition interface language for a tech display.' },
  { title: 'Signal Wave', category: 'Futurist', author: 'Artriel', filename: 'Dirgahayu Indonesia 75.png', description: 'A visionary layering of soundwave-inspired forms and cosmic light.' },
  { title: 'Neon Study', category: 'Futurist', author: 'Artriel', filename: 'Belajar Bac.png', description: 'A reflective digital sketch with luminous edges and futuristic flare.' },
  { title: 'Static Pulse', category: 'Tech', author: 'Artriel', filename: 'FINALLY.png', description: 'A charged tech-focused piece with white noise energy and slick detail.' },
  { title: 'Mono Board', category: 'Minimalist', author: 'Artriel', filename: 'IGF1.png', description: 'A quiet digital arrangement built around proportion and calm geometry.' },
  { title: 'Light Cast', category: 'Minimalist', author: 'Artriel', filename: 'IGF2.png', description: 'Subtle gradients and glassy detail define this serene gallery element.' },
  { title: 'Tech Bloom', category: 'Futurist', author: 'Artriel', filename: 'IGF3.png', description: 'A blooming futuristic artifact that sits between art and interface design.' },
  { title: 'Signal Loop', category: 'Tech', author: 'Artriel', filename: 'IGF4.png', description: 'A modular composition of neon rings, depth cues, and fluid motion.' },
  { title: 'Stellar Form', category: 'Minimalist', author: 'Artriel', filename: 'Jett Hijab IG.png', description: 'A refined visual statement in directional light and minimal contrast.' },
  { title: 'Cyber Bloom', category: 'Futurist', author: 'Artriel', filename: 'Latihan 10-08-2021 2.png', description: 'A luminous cyber garden with layered glow and metallic finish.' },
  { title: 'Flare Script', category: 'Tech', author: 'Artriel', filename: 'Lilin-AI.png', description: 'An interface-inspired narrative with articulate lines and digital texture.' },
  { title: 'Pure Form', category: 'Minimalist', author: 'Artriel', filename: 'Ma E.png', description: 'A calm, measured study of shapes presented in crisp tonal balance.' },
  { title: 'Data Pulse', category: 'Tech', author: 'Artriel', filename: 'Nyoba2.png', description: 'Fast-moving digital energy captured in blocky abstraction and glow.' },
  { title: 'Void Reflection', category: 'Futurist', author: 'Artriel', filename: 'Nyoba.png', description: 'A reflective futurist composition with depth, haze, and precision.' },
  { title: 'Quiet Node', category: 'Minimalist', author: 'Artriel', filename: 'okesip.png', description: 'A restrained visual node with airy spacing and pure design thinking.' },
  { title: 'Pixel Matrix', category: 'Tech', author: 'Artriel', filename: 'Pixel 3.png', description: 'A structured pixel-based layout that feels engineered and modern.' },
  { title: 'Neon Grid', category: 'Tech', author: 'Artriel', filename: 'PIXEL-2.png', description: 'A bold grid of neon forms and immersive UI-inspired detail.' },
  { title: 'Futurist Portrait', category: 'Futurist', author: 'Artriel', filename: 'Raze Hijab IG.png', description: 'A portrait-style digital study with a futuristic glow and sharp edges.' },
  { title: 'Soft Architecture', category: 'Minimalist', author: 'Artriel', filename: 'Reyna Hijab IG.png', description: 'A soft, clean architectural composition with harmonious balance.' },
  { title: 'Quantum Bloom', category: 'Futurist', author: 'Artriel', filename: 'Sage Hijab IG.png', description: 'A luminous synthesis of natural curves and future-tech polish.' },
  { title: 'Digital Pulse', category: 'Tech', author: 'Artriel', filename: 'Tess 5.png', description: 'A kinetic tech arrangement with arthouse edge and clarity.' },
  { title: 'Minimal Rhythm', category: 'Minimalist', author: 'Artriel', filename: 'Tess.png', description: 'A contemplative abstract piece built around motion and silence.' },
  { title: 'Holo Portrait', category: 'Futurist', author: 'Artriel', filename: 'Viper Hijab IG.png', description: 'A holographic portrait that blends luminous texture and digital movement.' }
];

let currentFilter = 'All';
let fullness = 0;

function buildSrc(filename) {
  return encodeURI(`assets/${filename}`);
}

function renderGallery() {
  const filtered = artworks.filter((item) => currentFilter === 'All' || item.category === currentFilter);
  galleryGrid.innerHTML = filtered.map((item) => {
    const originalIndex = artworks.indexOf(item);
    return `
      <article class="gallery-card interactive" data-index="${originalIndex}">
        <button type="button" class="gallery-action" aria-label="Open ${item.title}">
          <img class="gallery-thumb" src="${buildSrc(item.filename)}" alt="${item.title}">
          <div class="gallery-copy">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <span class="category-pill">${item.category}</span>
          </div>
        </button>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', onArtworkClick);
  });
}

function onArtworkClick(event) {
  const card = event.currentTarget;
  const index = parseInt(card.dataset.index, 10);
  openLightbox(artworks[index]);
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderGallery();
}

function openLightbox(item) {
  lightboxImage.src = buildSrc(item.filename);
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description;
  lightboxAuthor.textContent = `Author: ${item.author}`;
  lightboxCategory.textContent = item.category;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

function updateCatMeter() {
  const percent = (fullness / 5) * 100;
  catMeterFill.style.width = `${percent}%`;
  catMeterText.textContent = `Fullness meter: ${fullness} / 5`;
  catPortrait.className = `cat-portrait fullness-${fullness}`;

  if (fullness >= 5) {
    catFace.textContent = '😻';
  } else if (fullness >= 3) {
    catFace.textContent = '😸';
  } else if (fullness >= 1) {
    catFace.textContent = '😺';
  } else {
    catFace.textContent = '😼';
  }
}

function handleCursorMove(event) {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
}

function updateCursorState(target) {
  const interactive = target.closest('.interactive') || target.closest('button') || target.closest('a');
  cursor.classList.toggle('active', Boolean(interactive));
}

function initEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxClose.addEventListener('click', closeLightbox);
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  document.body.addEventListener('mousemove', handleCursorMove);
  document.body.addEventListener('pointerover', (event) => updateCursorState(event.target));
  document.body.addEventListener('pointerout', (event) => updateCursorState(event.relatedTarget || document.body));

  feedButton.addEventListener('click', () => {
    fullness = Math.min(5, fullness + 1);
    updateCatMeter();
  });
}

function init() {
  renderGallery();
  initEvents();
  updateCatMeter();
}

init();
