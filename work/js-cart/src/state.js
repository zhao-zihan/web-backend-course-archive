export const PAGES = {
  PRODUCTS: "products",
  CART: "cart",
};

const state = {
  cats: [
    {
      name: "Fluffball",
      imageUrl: "http://placekitten.com/150/150?image=1",
      price: 0.99,
      quantity: 0,
    },
    {
      name: "Meyhem",
      imageUrl: "http://placekitten.com/150/150?image=2",
      price: 3.14,
      quantity: 0,
    },
    {
      name: "Alice",
      imageUrl: "http://placekitten.com/150/150?image=3",
      price: 2.73,
      quantity: 0,
    },
  ],
  page: PAGES.PRODUCTS,
  cartTotal: 0,
};

export default state;
