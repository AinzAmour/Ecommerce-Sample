// Sample products
const products = [
  {
    id: 'dress1',
    name: 'Pink Princess Dress',
    price: 29.99,
    category: 'dress',
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'dress2',
    name: 'Floral Summer Dress',
    price: 24.99,
    category: 'dress',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'toy1',
    name: 'Plush Unicorn Toy',
    price: 14.99,
    category: 'toys',
    img: 'https://images.unsplash.com/photo-1519121782439-2c5f2c2e6c1b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'toy2',
    name: 'Wooden Dollhouse',
    price: 39.99,
    category: 'toys',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80',
  },
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  document.getElementById('cart-count').textContent = cart.length;
}
function addToCart(productId) {
  const cart = getCart();
  cart.push(productId);
  setCart(cart);
  updateCartCount();
  alert('Added to cart!');
}
function showProducts(filterCategory = null) {
  const container = document.getElementById('featured-products');
  if (!container) return;
  container.innerHTML = '';
  let filtered = products;
  if (filterCategory) {
    filtered = products.filter(p => p.category === filterCategory);
  }
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  showProducts();
  updateCartCount();
  // Category navigation
  document.querySelectorAll('.category-card, .nav-link').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const cat = el.getAttribute('data-category');
      if (cat) {
        showProducts(cat);
        window.scrollTo({ top: document.querySelector('.featured-products').offsetTop - 40, behavior: 'smooth' });
      }
    });
  });
  // Cart link
  document.getElementById('cart-link').addEventListener('click', e => {
    e.preventDefault();
    showCart();
  });
});
// Simple cart modal
function showCart() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  let msg = 'Your Cart:\n';
  let total = 0;
  cart.forEach(pid => {
    const prod = products.find(p => p.id === pid);
    if (prod) {
      msg += `- ${prod.name} ($${prod.price.toFixed(2)})\n`;
      total += prod.price;
    }
  });
  msg += `\nTotal: $${total.toFixed(2)}`;
  msg += '\n\n(Go to checkout in a real shop!)';
  alert(msg);
}
window.addToCart = addToCart; 