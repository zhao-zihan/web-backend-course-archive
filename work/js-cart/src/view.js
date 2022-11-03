import state, { PAGES } from "./state";

const appEl = document.querySelector(".main");

function render() {
  if (state.page === PAGES.PRODUCTS) {
    renderProducts();
  }
  if (state.page === PAGES.CART) {
    renderCart();
  }
}

function renderProducts() {
  const listHtml = state.cats
    .map((cat, index) => {
      return `
    <li>
      <img src="${cat.imageUrl}" alt="${cat.name}" class="cat__image">
      <h2 class="cat__name">${cat.name}</h2>
      <span class="cat__price">$${cat.price} for each</span>
      <button class="cat__add-cart" data-index="${index}">Add to Cart</button>
    </li>
    `;
    })
    .join("");

  const html = `
  <ul class="cats">${listHtml}</ul>
  <button class="view-cart">View Cart (${state.cartTotal})</button>
  `;

  appEl.innerHTML = html;
}

function renderCart() {
  const cartEmpty = state.cartTotal === 0;
  if (cartEmpty) {
    appEl.innerHTML = `
    <p class="empty-message">Nothing in the cart</p>
    <button class="hide-cart">Hide Cart</button>
    `;
  } else {
    renderCatInCart();
  }
}

function renderCatInCart() {
  const listHtml = state.cats
    .map((cat, index) => {
      const totalPrice = cat.price * cat.quantity;
      console.log(typeof totalPrice);
      return cat.quantity > 0
        ? `
    <li>
      <img src="${cat.imageUrl}" alt="${cat.name}" class="cat__image">
      <h2 class="cat__name">${cat.name}</h2>
      <div class="cat__quantity-modifier">
        <button class="quantity-button cat__quantity-minus" data-index="${index}">-</button>
        <span class="cat__quantity">Quantity: ${cat.quantity}</span>
        <button class="quantity-button cat__quantity-plus" data-index="${index}">+</button>
      </div>
      <span class="cat__price-total">Total: ${parseFloat(totalPrice).toFixed(
        2
      )}</span>
    </li>
    `
        : "";
    })
    .join("");

  let totalPrice = 0;
  let totalCats = 0;
  state.cats.forEach((cat) => {
    totalPrice += cat.price * cat.quantity;
    totalCats += cat.quantity;
  });

  const html = `
  <ul class="cats">${listHtml}</ul>
  <span class="cart__price">Total cats: ${totalCats}; Total price: ${parseFloat(
    totalPrice
  ).toFixed(2)}</span>
  <div class="cart__buttons">
    <button class="hide-cart">Hide Cart</button>
    <button class="checkout">Checkout</button>
  </div>
  `;

  appEl.innerHTML = html;
}

export default render;
