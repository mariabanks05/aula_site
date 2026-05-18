const searchInput = document.getElementById('searchInput');
const homeView = document.getElementById('homeView');
const ordersView = document.getElementById('ordersView');
const profileView = document.getElementById('profileView');
const itemsList = document.getElementById('itemsList');
const tabButtons = document.querySelectorAll('.card-button');

const menuItems = [
  { id: 1, name: 'X-Burguer', description: 'Pão, carne, queijo e molho especial.', price: 24.90 },
  { id: 2, name: 'Porção de Batata', description: 'Batatas crocantes com cheddar.', price: 18.50 },
  { id: 3, name: 'Açai com Granola', description: 'Açai gelado com frutas e granola.', price: 16.00 },
  { id: 4, name: 'Suco Natural', description: 'Suco de laranja fresco.', price: 9.90 }
];

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderItems(items) {
  itemsList.innerHTML = items
    .map(
      (item) => `
        <div class="item-card">
          <div class="item-info">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-desc">${item.description}</p>
            <div class="item-meta">
              <span class="price">${formatPrice(item.price)}</span>
            </div>
          </div>
          <button class="add-button" type="button">Adicionar</button>
        </div>
      `
    )
    .join('');
}

function switchTab(tabKey) {
  document.querySelectorAll('.card-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabKey);
  });

  homeView.classList.toggle('hidden', tabKey !== 'buscar');
  ordersView.classList.toggle('hidden', tabKey !== 'pedidos');
  profileView.classList.toggle('hidden', tabKey !== 'perfil');
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  const filtered = menuItems.filter((item) => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
  renderItems(filtered);
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

renderItems(menuItems);
