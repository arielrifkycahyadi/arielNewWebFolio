/* ========================================
   KASIR ARTRIEL - JAVASCRIPT
   ========================================
   Point of Sale System
   Version: 2.0
   Built with: Vanilla ES6+ JavaScript
*/

(function() {
  'use strict';

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Application State
  const appState = {
    products: [],
    cart: [],
    currentCategory: 'all',
    searchQuery: '',
    currentView: 'products',
    discount: 0
  };

  // Product Database (Mock Data)
  const productDatabase = [
    { id: 1, name: 'Nasi Goreng Special', category: 'makanan', price: 25000, emoji: '🍳', stock: 15 },
    { id: 2, name: 'Mie Goreng Jawa', category: 'makanan', price: 20000, emoji: '🍜', stock: 20 },
    { id: 3, name: 'Ayam Goreng Krispi', category: 'makanan', price: 22000, emoji: '🍗', stock: 18 },
    { id: 4, name: 'Sate Ayam', category: 'makanan', price: 28000, emoji: '🥩', stock: 12 },
    { id: 5, name: 'Bakso Jumbo', category: 'makanan', price: 18000, emoji: '🍲', stock: 25 },
    { id: 6, name: 'Es Teh Manis', category: 'minuman', price: 5000, emoji: '🧋', stock: 50 },
    { id: 7, name: 'Kopi Hitam', category: 'minuman', price: 8000, emoji: '☕', stock: 40 },
    { id: 8, name: 'Jus Alpukat', category: 'minuman', price: 15000, emoji: '🥑', stock: 15 },
    { id: 9, name: 'Teh Tarik', category: 'minuman', price: 10000, emoji: '🫖', stock: 30 },
    { id: 10, name: 'Es Campur', category: 'minuman', price: 12000, emoji: '🍨', stock: 20 },
    { id: 11, name: 'Kentang Goreng', category: 'snack', price: 12000, emoji: '🍟', stock: 30 },
    { id: 12, name: 'Cireng Isi', category: 'snack', price: 8000, emoji: '🥟', stock: 25 },
    { id: 13, name: 'Pisang Goreng', category: 'snack', price: 10000, emoji: '🍌', stock: 20 },
    { id: 14, name: 'Chicken Wings', category: 'snack', price: 18000, emoji: '🍖', stock: 18 },
    { id: 15, name: 'Tahu Bulat', category: 'snack', price: 5000, emoji: '🧈', stock: 40 },
    { id: 16, name: 'Pudding Coklat', category: 'dessert', price: 10000, emoji: '🍮', stock: 15 },
    { id: 17, name: 'Es Krim Cone', category: 'dessert', price: 12000, emoji: '🍦', stock: 20 },
    { id: 18, name: 'Brownies Kukus', category: 'dessert', price: 15000, emoji: '🧁', stock: 12 },
    { id: 19, name: 'Cheese Cake', category: 'dessert', price: 20000, emoji: '🍰', stock: 10 },
    { id: 20, name: 'Fruit Salad', category: 'dessert', price: 18000, emoji: '🥗', stock: 15 }
  ];

  // ========================================
  // DOM ELEMENTS
  // ========================================
  
  const elements = {
    productGrid: document.getElementById('productGrid'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    subtotal: document.getElementById('subtotal'),
    tax: document.getElementById('tax'),
    discount: document.getElementById('discount'),
    total: document.getElementById('total'),
    searchInput: document.getElementById('searchInput'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    checkoutModal: document.getElementById('checkoutModal'),
    modalTotal: document.getElementById('modalTotal'),
    modalMessage: document.getElementById('modalMessage'),
    
    // Mini-game elements
    minigameArea: document.getElementById('minigameArea'),
    fatCat: document.getElementById('fatCat'),
    gameScore: document.getElementById('gameScore'),
    catHappiness: document.getElementById('catHappiness'),
    feedBtn: document.getElementById('feedBtn'),
    resetGameBtn: document.getElementById('resetGameBtn'),
    
    // Action buttons
    clearCartBtn: document.getElementById('clearCartBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    resetBtn: document.getElementById('resetBtn'),
    newOrderBtn: document.getElementById('newOrderBtn'),
    startShoppingBtn: document.getElementById('startShoppingBtn')
  };

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  /**
   * Format number to Indonesian Rupiah
   * @param {number} amount - Amount to format
   * @returns {string} Formatted string
   */
  function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} icon - Icon to show
   */
  function showToast(message, icon = '✅') {
    elements.toastMessage.textContent = message;
    elements.toast.querySelector('.toast-icon').textContent = icon;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 3000);
  }

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Smooth scroll to main content
   */
  function scrollToMain() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ========================================
  // PRODUCT RENDERING
  // ========================================
  
  /**
   * Filter products based on category and search
   * @returns {Array} Filtered products
   */
  function getFilteredProducts() {
    let filtered = [...productDatabase];
    
    // Filter by category
    if (appState.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === appState.currentCategory);
    }
    
    // Filter by search query
    if (appState.searchQuery) {
      const query = appState.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }

  /**
   * Render product cards to the grid
   */
  function renderProducts() {
    const products = getFilteredProducts();
    
    if (products.length === 0) {
      elements.productGrid.innerHTML = `
        <div class="cart-empty" style="grid-column: 1 / -1;">
          <div class="cart-empty-icon">🔍</div>
          <p class="cart-empty-text">Produk tidak ditemukan.<br>Coba kata kunci lain!</p>
        </div>
      `;
      return;
    }
    
    elements.productGrid.innerHTML = products.map((product, index) => `
      <div class="product-card slide-up" 
           style="animation-delay: ${index * 0.05}s" 
           data-id="${product.id}"
           onclick="addToCart(${product.id})">
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">${formatRupiah(product.price)}</div>
          <div class="product-stock">
            <span class="stock-dot ${product.stock < 5 ? 'low' : product.stock === 0 ? 'out' : ''}"></span>
            ${product.stock} tersedia
          </div>
        </div>
      </div>
    `).join('');
  }

  // ========================================
  // CART MANAGEMENT
  // ========================================
  
  /**
   * Add product to cart
   * @param {number} productId - ID of product to add
   */
  function addToCart(productId) {
    const product = productDatabase.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = appState.cart.find(item => item.product.id === productId);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity++;
    } else {
      // Add new item
      appState.cart.push({
        id: generateId(),
        product: product,
        quantity: 1
      });
    }
    
    // Visual feedback
    const card = document.querySelector(`[data-id="${productId}"]`);
    if (card) {
      card.classList.add('added');
      setTimeout(() => card.classList.remove('added'), 500);
    }
    
    showToast(`${product.name} ditambahkan ke keranjang!`, '🛒');
    renderCart();
    updateCartCount();
  }

  /**
   * Remove item from cart
   * @param {string} cartItemId - ID of cart item to remove
   */
  function removeFromCart(cartItemId) {
    const item = appState.cart.find(i => i.id === cartItemId);
    if (item) {
      showToast(`${item.product.name} dihapus dari keranjang!`, '🗑️');
    }
    
    appState.cart = appState.cart.filter(item => item.id !== cartItemId);
    renderCart();
    updateCartCount();
  }

  /**
   * Update item quantity in cart
   * @param {string} cartItemId - ID of cart item
   * @param {number} change - Change in quantity (+1 or -1)
   */
  function updateQuantity(cartItemId, change) {
    const item = appState.cart.find(i => i.id === cartItemId);
    if (!item) return;
    
    item.quantity += change;
    
    // Remove if quantity becomes 0
    if (item.quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    
    renderCart();
  }

  /**
   * Render cart items
   */
  function renderCart() {
    if (appState.cart.length === 0) {
      elements.cartItems.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p class="cart-empty-text">Keranjang masih kosong.<br>Tambahkan produk dari menu!</p>
        </div>
      `;
    } else {
      elements.cartItems.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">${item.product.emoji}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.product.name}</div>
            <div class="cart-item-price">${formatRupiah(item.product.price)}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
          <div class="cart-item-total">${formatRupiah(item.product.price * item.quantity)}</div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
        </div>
      `).join('');
    }
    
    calculateTotal();
  }

  /**
   * Update cart count badge
   */
  function updateCartCount() {
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
  }

  /**
   * Calculate cart totals
   */
  function calculateTotal() {
    const subtotal = appState.cart.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
    
    const tax = Math.round(subtotal * 0.10); // 10% tax
    const discount = appState.discount;
    const total = subtotal + tax - discount;
    
    elements.subtotal.textContent = formatRupiah(subtotal);
    elements.tax.textContent = formatRupiah(tax);
    elements.discount.textContent = `- ${formatRupiah(discount)}`;
    elements.total.textContent = formatRupiah(total);
  }

  /**
   * Clear the cart
   */
  function clearCart() {
    if (appState.cart.length === 0) {
      showToast('Keranjang sudah kosong!', 'ℹ️');
      return;
    }
    
    appState.cart = [];
    appState.discount = 0;
    renderCart();
    updateCartCount();
    showToast('Keranjang dikosongkan!', '🗑️');
  }

  /**
   * Process checkout
   */
  function checkout() {
    if (appState.cart.length === 0) {
      showToast('Keranjang kosong! Tambahkan produk terlebih dahulu.', '⚠️');
      return;
    }
    
    const total = appState.cart.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    ) * 1.10; // Including tax
    
    elements.modalTotal.textContent = formatRupiah(Math.round(total));
    elements.checkoutModal.classList.add('show');
  }

  /**
   * Close checkout modal
   */
  function closeModal() {
    elements.checkoutModal.classList.remove('show');
    clearCart();
  }

  // ========================================
  // MINI-GAME: FEED THE FAT CAT
  // ========================================
  
  const gameState = {
    score: 0,
    catHappiness: 50,
    catPosition: { x: 50, y: 50 },
    isPlaying: true
  };

  /**
   * Initialize mini-game
   */
  function initMinigame() {
    // Position cat in center
    updateCatPosition(50, 50);
    
    // Add click handler for feeding
    elements.minigameArea.addEventListener('click', handleGameClick);
  }

  /**
   * Update cat position
   * @param {number} x - X position in percentage
   * @param {number} y - Y position in percentage
   */
  function updateCatPosition(x, y) {
    gameState.catPosition = { x, y };
    elements.fatCat.style.left = `calc(${x}% - 40px)`;
    elements.fatCat.style.top = `calc(${y}% - 40px)`;
  }

  /**
   * Handle game area click (feed the cat)
   * @param {Event} e - Click event
   */
  function handleGameClick(e) {
    if (!gameState.isPlaying) return;
    
    const rect = elements.minigameArea.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    spawnFood(x, y);
  }

  /**
   * Spawn food item at position
   * @param {number} x - X position
   * @param {number} y - Y position
   */
  function spawnFood(x, y) {
    const foods = ['🐟', '🍖', '🥛', '🐭'];
    const food = document.createElement('div');
    food.className = 'food-item';
    food.textContent = foods[Math.floor(Math.random() * foods.length)];
    food.style.left = `${x}%`;
    food.style.top = `${y}%`;
    
    elements.minigameArea.appendChild(food);
    
    // Check if food lands near cat
    setTimeout(() => {
      const catRect = elements.fatCat.getBoundingClientRect();
      const foodRect = food.getBoundingClientRect();
      
      const distance = Math.sqrt(
        Math.pow(catRect.left - foodRect.left, 2) + 
        Math.pow(catRect.top - foodRect.top, 2)
      );
      
      if (distance < 80) {
        // Cat eats the food!
        feedCat();
      }
      
      // Remove food after animation
      setTimeout(() => food.remove(), 2000);
    }, 1500);
  }

  /**
   * Feed the cat (button click)
   */
  function feedCat() {
    gameState.score += 10;
    gameState.catHappiness = Math.min(100, gameState.catHappiness + 15);
    
    // Update display
    elements.gameScore.textContent = gameState.score;
    updateCatHappiness();
    
    // Cat bounce animation
    elements.fatCat.classList.add('bounce');
    setTimeout(() => elements.fatCat.classList.remove('bounce'), 500);
    
    // Move cat to random position
    const newX = 20 + Math.random() * 60;
    const newY = 20 + Math.random() * 60;
    updateCatPosition(newX, newY);
  }

  /**
   * Update cat happiness display
   */
  function updateCatHappiness() {
    if (gameState.catHappiness >= 80) {
      elements.catHappiness.textContent = '😸';
    } else if (gameState.catHappiness >= 50) {
      elements.catHappiness.textContent = '😺';
    } else if (gameState.catHappiness >= 30) {
      elements.catHappiness.textContent = '🐱';
    } else {
      elements.catHappiness.textContent = '😿';
    }
  }

  /**
   * Reset the game
   */
  function resetGame() {
    gameState.score = 0;
    gameState.catHappiness = 50;
    gameState.isPlaying = true;
    
    elements.gameScore.textContent = '0';
    updateCatHappiness();
    updateCatPosition(50, 50);
    
    showToast('Game direset! Mulai lagi!', '🔄');
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  
  /**
   * Initialize all event listeners
   */
  function initEventListeners() {
    // Search input
    elements.searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      renderProducts();
    });

    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        appState.currentCategory = btn.dataset.category;
        renderProducts();
      });
    });

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        appState.currentView = item.dataset.view;
        
        // Show appropriate view (for now just show toast)
        if (item.dataset.view !== 'products') {
          showToast(`Fitur ${item.dataset.view} akan segera tersedia!`, '🚧');
        }
      });
    });

    // Cart buttons
    elements.clearCartBtn.addEventListener('click', clearCart);
    elements.checkoutBtn.addEventListener('click', checkout);
    elements.closeModalBtn.addEventListener('click', closeModal);

    // Header buttons
    elements.resetBtn.addEventListener('click', () => {
      clearCart();
      showToast('Sistem direset!', '🔄');
    });

    elements.newOrderBtn.addEventListener('click', () => {
      clearCart();
      showToast('Pesanan baru dimulai!', '🆕');
    });

    // Hero CTA button
    if (elements.startShoppingBtn) {
      elements.startShoppingBtn.addEventListener('click', scrollToMain);
    }

    // Mini-game buttons
    elements.feedBtn.addEventListener('click', feedCat);
    elements.resetGameBtn.addEventListener('click', resetGame);

    // Close modal on overlay click
    elements.checkoutModal.addEventListener('click', (e) => {
      if (e.target === elements.checkoutModal) {
        closeModal();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape to close modal
      if (e.key === 'Escape') {
        closeModal();
      }
      // Ctrl+N for new order
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        clearCart();
        showToast('Pesanan baru dimulai!', '🆕');
      }
    });
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  
  /**
   * Initialize the application
   */
  function init() {
    console.log('🚀 Kasir Artriel - POS System v2.0 Initialized');
    console.log('📦 Products loaded:', productDatabase.length);
    
    // Initialize products
    appState.products = [...productDatabase];
    
    // Render initial state
    renderProducts();
    renderCart();
    updateCartCount();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize mini-game
    initMinigame();
    
    // Show welcome toast
    setTimeout(() => {
      showToast('Selamat datang di Kasir Artriel! 🐱', '👋');
    }, 500);
  }

  // Start the application when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Make functions globally accessible for onclick handlers
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQuantity = updateQuantity;

})();