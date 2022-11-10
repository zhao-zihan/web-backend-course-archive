import state, { PAGES } from "./state";
import render from "./view";

const appEl = document.querySelector(".main");

appEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("view-cart")) {
    state.page = state.page === PAGES.PRODUCTS ? PAGES.CART : PAGES.PRODUCTS;
    render();
    return;
  }
  if (event.target.classList.contains("hide-cart")) {
    state.page = state.page === PAGES.PRODUCTS ? PAGES.CART : PAGES.PRODUCTS;
    render();
    return;
  }
  if (event.target.classList.contains("cat__add-cart")) {
    const index = event.target.dataset.index;
    state.cats[index].quantity++;
    state.cartTotal++;
    render();
    return;
  }
  if (event.target.classList.contains("cat__quantity-minus")) {
    const index = event.target.dataset.index;
    state.cats[index].quantity--;
    state.cartTotal--;
    console.log(state.cats);
    render();
    return;
  }
  if (event.target.classList.contains("cat__quantity-plus")) {
    const index = event.target.dataset.index;
    state.cats[index].quantity++;
    state.cartTotal++;
    render();
    return;
  }
  if (event.target.classList.contains("checkout")) {
    state.cats.forEach((cat) => {
      cat.quantity = 0;
    });
    state.cartTotal = 0;
    render();
    return;
  }
});

render();
