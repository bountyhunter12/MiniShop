export function validateLoginInput(email, password) {
  if (!email || !password) return { ok: false, error: "Email and password required" };
  if (!email.includes("@")) return { ok: false, error: "Invalid email" };
  if (password.length < 4) return { ok: false, error: "Password too short" };
  return { ok: true };
}

export function calculateCartTotal(cartItems, products) {
  let total = 0;
  for (const item of cartItems) {
    const p = products.find(x => x.id === item.productId);
    if (!p) continue; // defensive
    total += p.price * item.qty;
  }
  return Number(total.toFixed(2));
}

export function validateCheckout(payload) {
  const { name, address, paymentMethod } = payload || {};
  if (!name || name.trim().length < 2) return { ok: false, error: "Name required" };
  if (!address || address.trim().length < 5) return { ok: false, error: "Address required" };
  if (!paymentMethod || !["card", "cod"].includes(paymentMethod)) {
    return { ok: false, error: "Invalid payment method" };
  }
  return { ok: true };
}