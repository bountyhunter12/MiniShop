import { useEffect, useState } from "react";
import { getCart, getProducts, removeFromCart } from "../api";

export default function Cart({ token }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  async function load() {
    const [c, p] = await Promise.all([getCart(token), getProducts()]);
    setCart(c.cart);
    setProducts(p.products);
  }

  useEffect(() => { load(); }, []);

  function nameOf(id) {
    return products.find(x => x.id === id)?.name || "Unknown";
  }

  async function remove(productId) {
    await removeFromCart(token, productId);
    await load();
  }

  return (
    <div>
      <h3>Cart</h3>
      {cart.length === 0 ? <p>Cart is empty</p> : null}
      {cart.map(i => (
        <div key={i.productId} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
          <span>{nameOf(i.productId)} x {i.qty}</span>
          <button onClick={() => remove(i.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
}