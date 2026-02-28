import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts().then(d => setProducts(d.products));
  }, []);

  async function add(p) {
    setMsg("");
    try {
      await addToCart(token, p.id, 1);
      setMsg(`Added ${p.name}`);
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div>
      <h3>Products</h3>
      {products.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
          <span>{p.name} - ${p.price}</span>
          <button onClick={() => add(p)}>Add</button>
        </div>
      ))}
      {msg && <p>{msg}</p>}
    </div>
  );
}