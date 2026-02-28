const API = "http://localhost:5000";

export async function login(email, password) {
  const r = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return handle(r);
}

export async function getProducts() {
  const r = await fetch(`${API}/products`);
  return handle(r);
}

export async function getCart(token) {
  const r = await fetch(`${API}/cart`, { headers: { "x-auth-token": token } });
  return handle(r);
}

export async function addToCart(token, productId, qty = 1) {
  const r = await fetch(`${API}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-auth-token": token },
    body: JSON.stringify({ productId, qty })
  });
  return handle(r);
}

export async function removeFromCart(token, productId) {
  const r = await fetch(`${API}/cart/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-auth-token": token },
    body: JSON.stringify({ productId })
  });
  return handle(r);
}

export async function checkout(token, payload) {
  const r = await fetch(`${API}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-auth-token": token },
    body: JSON.stringify(payload)
  });
  return handle(r);
}

async function handle(r) {
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Request failed");
  return data;
}