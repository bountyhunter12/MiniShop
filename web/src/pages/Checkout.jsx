import { useState } from "react";
import { checkout } from "../api";

export default function Checkout({ token }) {
  const [name, setName] = useState("Faozia");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr(""); setResult("");
    try {
      const data = await checkout(token, { name, address, paymentMethod });
      setResult(`${data.message} | Total: $${data.total} | ${data.orderId}`);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>Checkout</h3>
      <div><input placeholder="name" value={name} onChange={e => setName(e.target.value)} /></div>
      <div><input placeholder="address" value={address} onChange={e => setAddress(e.target.value)} /></div>
      <div>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="card">Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>
      <button type="submit">Place order</button>
      {result && <p style={{ color: "green" }}>{result}</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </form>
  );
}