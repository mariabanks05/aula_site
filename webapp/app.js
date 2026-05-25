const searchInput = document.getElementById('searchInput');
const homeView = document.getElementById('homeView');
const searchView = document.getElementById('searchView');
const ordersView = document.getElementById('ordersView');
const profileView = document.getElementById('profileView');
const deliveryView = document.getElementById('deliveryView');
const confirmationView = document.getElementById('confirmationView');
const itemsList = document.getElementById('itemsList');
const tabButtons = document.querySelectorAll('.card-button');
const deliveryForm = document.getElementById('deliveryForm');
const backToCartBtn = document.getElementById('backToCart');
const backToHomeBtn = document.getElementById('backToHome');
const startOrderBtn = document.getElementById('startOrderBtn');

let userProfile = {
  name: 'Maria Silva',
  phone: '(11) 98765-4321'
};

let orderHistory = [];

const menuItems = [
  { 
    id: 1, 
    name: 'X-Burguer', 
    description: 'Pão, carne, queijo e molho especial.', 
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
  },
  { 
    id: 2, 
    name: 'Porção de Batata', 
    description: 'Batatas crocantes com cheddar.', 
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1599599810694-11bc3c3cf87f?w=400&h=300&fit=crop'
  },
  { 
    id: 3, 
    name: 'Açai com Granola', 
    description: 'Açai gelado com frutas e granola.', 
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1590511294207-3a88f0984d3f?w=400&h=300&fit=crop'
  },
  { 
    id: 4, 
    name: 'Suco Natural', 
    description: 'Suco de laranja fresco.', 
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
  }
];

const categories = [
  { name: 'Hambúrgueres', emoji: '🍔' },
  { name: 'Acompanhamentos', emoji: '🍟' },
  { name: 'Sobremesas', emoji: '🍦' },
  { name: 'Bebidas', emoji: '🥤' }
];

let cart = [];

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderItems(items) {
  itemsList.innerHTML = items
    .map(
      (item) => `
        <div class="item-card">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-info">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-desc">${item.description}</p>
            <div class="item-meta">
              <span class="price">${formatPrice(item.price)}</span>
            </div>
          </div>
          <button class="add-button" type="button" data-item-id="${item.id}">Adicionar</button>
        </div>
      `
    )
    .join('');

  // Adiciona event listener aos botões
  document.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', addToCart);
  });
}

function renderHome() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  const highlightsList = document.getElementById('highlightsList');

  // Renderiza categorias
  const categoriesHTML = categories
    .map(
      (cat) => `
    <div class="category-card">
      <span class="category-emoji">${cat.emoji}</span>
      <p>${cat.name}</p>
    </div>
  `
    )
    .join('');

  categoriesGrid.innerHTML = categoriesHTML;

  // Renderiza destaques (primeiros 2 itens do cardápio)
  const highlightsHTML = menuItems
    .slice(0, 2)
    .map(
      (item) => `
    <div class="highlight-card">
      <div class="highlight-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="highlight-info">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <span class="highlight-price">${formatPrice(item.price)}</span>
      </div>
      <button class="highlight-add-btn" data-item-id="${item.id}">Adicionar</button>
    </div>
  `
    )
    .join('');

  highlightsList.innerHTML = highlightsHTML;

  // Adiciona event listeners aos botões de destaque
  document.querySelectorAll('.highlight-add-btn').forEach((button) => {
    button.addEventListener('click', addToCart);
  });
}

function addToCart(event) {
  const itemId = parseInt(event.target.dataset.itemId);
  const item = menuItems.find((i) => i.id === itemId);

  if (item) {
    const existingItem = cart.find((i) => i.id === itemId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    renderOrders();
  }
}

function renderOrders() {
  if (cart.length === 0) {
    ordersView.innerHTML = '<h2>Meus Pedidos</h2><p>Seu carrinho está vazio.</p>';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const ordersHTML = `
    <h2>Meus Pedidos</h2>
    <div class="cart-items">
      ${cart
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Preço: ${formatPrice(item.price)}</p>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">+</button>
            <span class="subtotal">${formatPrice(item.price * item.quantity)}</span>
            <button class="remove-btn" data-item-id="${item.id}">Remover</button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
    <div class="cart-total">
      <h3>Total: ${formatPrice(total)}</h3>
      <button class="checkout-btn" id="proceedBtn">Prosseguir</button>
    </div>
  `;

  ordersView.innerHTML = ordersHTML;

  // Adiciona event listener ao botão Prosseguir
  document.getElementById('proceedBtn').addEventListener('click', goToDelivery);

  // Adiciona event listeners aos botões do carrinho
  document.querySelectorAll('.quantity-btn').forEach((button) => {
    button.addEventListener('click', updateQuantity);
  });

  document.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', removeFromCart);
  });
}

function switchTab(tabKey) {
  document.querySelectorAll('.card-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabKey);
  });

  homeView.classList.toggle('hidden', tabKey !== 'inicio');
  searchView.classList.toggle('hidden', tabKey !== 'buscar');
  ordersView.classList.toggle('hidden', tabKey !== 'pedidos');
  profileView.classList.toggle('hidden', tabKey !== 'perfil');
  deliveryView.classList.toggle('hidden', tabKey !== 'delivery');
  confirmationView.classList.toggle('hidden', tabKey !== 'confirmation');
}

function updateQuantity(event) {
  const itemId = parseInt(event.target.dataset.itemId);
  const action = event.target.dataset.action;
  const item = cart.find((i) => i.id === itemId);

  if (item) {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }
    renderOrders();
  }
}

function removeFromCart(event) {
  const itemId = parseInt(event.target.dataset.itemId);
  cart = cart.filter((i) => i.id !== itemId);
  renderOrders();
}

function goToDelivery() {
  switchTab('delivery');
}

function submitDelivery(event) {
  event.preventDefault();
  const name = document.getElementById('customerName').value;
  const address = document.getElementById('customerAddress').value;
  const phone = document.getElementById('customerPhone').value;

  if (name && address && phone) {
    // Gera número de pedido
    const orderNumber = '#' + Math.floor(Math.random() * 9000) + 1000;
    const today = new Date().toLocaleDateString('pt-BR');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Adiciona ao histórico
    orderHistory.unshift({
      orderNumber,
      date: today,
      total,
      status: 'Entregue'
    });
    
    // Preenche dados de confirmação
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('deliveryAddress').textContent = address;
    
    // Vai para tela de confirmação
    switchTab('confirmation');
    
    // Limpa o formulário
    deliveryForm.reset();
  }
}

function backToHome() {
  // Limpa o carrinho
  cart = [];
  // Volta ao cardápio
  switchTab('inicio');
  // Re-renderiza as telas
  renderHome();
  renderItems(menuItems);
  renderOrders();
}

function renderProfile() {
  const profileName = document.getElementById('profileName');
  const profilePhone = document.getElementById('profilePhone');
  const profileAvatar = document.getElementById('profileAvatar');

  profileName.textContent = userProfile.name;
  profilePhone.textContent = userProfile.phone;
  profileAvatar.textContent = userProfile.name.charAt(0).toUpperCase();

  renderOrderHistory();
}

function renderOrderHistory() {
  const orderHistoryDiv = document.getElementById('orderHistory');

  if (orderHistory.length === 0) {
    orderHistoryDiv.innerHTML = '<p class="empty-message">Nenhum pedido realizado ainda.</p>';
    return;
  }

  const historyHTML = orderHistory
    .map(
      (order, index) => `
    <div class="history-item">
      <div class="history-info">
        <h4>Pedido ${order.orderNumber}</h4>
        <p class="history-date">${order.date}</p>
      </div>
      <div class="history-details">
        <span class="history-total">${formatPrice(order.total)}</span>
        <span class="history-status">${order.status}</span>
      </div>
    </div>
  `
    )
    .join('');

  orderHistoryDiv.innerHTML = historyHTML;
}

function toggleEditProfile() {
  const editProfileForm = document.getElementById('editProfileForm');
  editProfileForm.classList.toggle('hidden');

  if (!editProfileForm.classList.contains('hidden')) {
    document.getElementById('editName').value = userProfile.name;
    document.getElementById('editPhone').value = userProfile.phone;
  }
}

function saveProfile(event) {
  event.preventDefault();
  const name = document.getElementById('editName').value;
  const phone = document.getElementById('editPhone').value;

  if (name && phone) {
    userProfile.name = name;
    userProfile.phone = phone;
    renderProfile();
    toggleEditProfile();
  }
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  const filtered = menuItems.filter((item) => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
  renderItems(filtered);
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

deliveryForm.addEventListener('submit', submitDelivery);
backToCartBtn.addEventListener('click', () => switchTab('pedidos'));
backToHomeBtn.addEventListener('click', backToHome);

const editProfileBtn = document.getElementById('editProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editProfileForm = document.getElementById('editProfileForm');

editProfileBtn.addEventListener('click', toggleEditProfile);
cancelEditBtn.addEventListener('click', toggleEditProfile);
editProfileForm.addEventListener('submit', saveProfile);

startOrderBtn.addEventListener('click', () => switchTab('buscar'));

renderHome();
renderItems(menuItems);
renderOrders();
renderProfile();
