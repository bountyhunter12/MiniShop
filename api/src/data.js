export const products = [
  { id: 1, name: "T-Shirt", price: 15 },
  { id: 2, name: "Mug", price: 8 },
  { id: 3, name: "Cap", price: 12 }
];

// token -> cart items
export const carts = new Map(); // token => [{productId, qty}]