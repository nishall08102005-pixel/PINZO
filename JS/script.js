const products = [
  {
    id: 1,
    name: "Nike Air Force 1",
    brand: "Nike",
    price: 10999,
    image: "Images/airforce1.jpg"
  },
  {
    id: 2,
    name: "Air Jordan 1",
    brand: "Jordan",
    price: 14999,
    image: "Images/jordan1.jpg"
  },
  {
    id: 3,
    name: "Adidas Superstar",
    brand: "Adidas",
    price: 8999,
    image: "Images/superstar.jpg"
  },
  {
    id: 4,
    name: "Reebok Classic",
    brand: "Reebok",
    price: 7999,
    image: "Images/reebokclassic.jpg"
  }
];

function getCart() {
  return JSON.parse(localStorage.getItem("pinzoCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("pinzoCart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    let totalItems = 0;
    cart.forEach(item => {
      totalItems += item.quantity;
    });
    cartCount.textContent = totalItems;
  }
}

function addToCart(productId) {
  const cart = getCart();
  const selectedProduct = products.find(product => product.id === productId);

  if (!selectedProduct) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...selectedProduct,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  alert(selectedProduct.name + " added to cart!");
}

function displayProducts() {
  const productContainer = document.getElementById("productContainer");
  if (!productContainer) return;

  productContainer.innerHTML = "";

  products.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <h4>₹${product.price}</h4>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function increaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find(product => product.id === productId);

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
  updateCartCount();
  displayCartItems();
}

function decreaseQuantity(productId) {
  let cart = getCart();
  const item = cart.find(product => product.id === productId);

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(product => product.id !== productId);
    }
  }

  saveCart(cart);
  updateCartCount();
  displayCartItems();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(product => product.id !== productId);

  saveCart(cart);
  updateCartCount();
  displayCartItems();
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  if (!cartItemsContainer || !totalPriceElement) return;

  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-item">
        <div class="cart-item-details">
          <h3>Your cart is empty</h3>
          <p>Add some sneakers from the products page.</p>
        </div>
      </div>
    `;
    totalPriceElement.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Brand: ${item.brand}</p>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Size: ${item.size ? item.size : "Standard"}</p>
          <p>Subtotal: ₹${item.price * item.quantity}</p>
        </div>

        <div class="cart-actions">
          <button onclick="increaseQuantity(${item.id})">+</button>
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  totalPriceElement.textContent = "Total: ₹" + total;
}

document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  displayCartItems();
  updateCartCount();
});