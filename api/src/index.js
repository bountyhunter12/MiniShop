import express from "express";
import cors from "cors";
import { products, carts } from "./data.js";
import { validateLoginInput, validateCheckout, calculateCartTotal } from "./validators.js";

const app = express();
app.use(cors());
app.use(express.json());

function requireAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "Missing auth token" });
  req.token = token;
  next();
}
app.get("/", (req, res) => {
  res.send("MiniShop API is running ✅ Try /products");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const v = validateLoginInput(email, password);
  if (!v.ok) return res.status(400).json({ error: v.error });

  // simple fake auth
  const token = `token_${Buffer.from(email).toString("base64")}`;
  if (!carts.has(token)) carts.set(token, []);
  res.json({ token });
});

app.get("/products", (_req, res) => {
  res.json({ products });
});

app.get("/cart", requireAuth, (req, res) => {
  const cart = carts.get(req.token) || [];
  res.json({ cart });
});

app.post("/cart/add", requireAuth, (req, res) => {
  const { productId, qty } = req.body || {};
  if (!Number.isInteger(productId)) return res.status(400).json({ error: "productId must be int" });
  if (!Number.isInteger(qty) || qty < 1) return res.status(400).json({ error: "qty must be >= 1" });

  const p = products.find(x => x.id === productId);
  if (!p) return res.status(404).json({ error: "Product not found" });

  const cart = carts.get(req.token) || [];
  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ productId, qty });
  carts.set(req.token, cart);

  res.json({ cart });
});

app.post("/cart/remove", requireAuth, (req, res) => {
  const { productId } = req.body || {};
  const cart = carts.get(req.token) || [];
  const nextCart = cart.filter(i => i.productId !== productId);
  carts.set(req.token, nextCart);
  res.json({ cart: nextCart });
});

app.post("/checkout", requireAuth, (req, res) => {
  const cart = carts.get(req.token) || [];
  if (cart.length === 0) return res.status(400).json({ error: "Cart is empty" });

  const v = validateCheckout(req.body);
  if (!v.ok) return res.status(400).json({ error: v.error });

  const total = calculateCartTotal(cart, products);
  carts.set(req.token, []); // clear cart after checkout

  res.json({
    message: "Order placed successfully",
    total,
    orderId: `ORD-${Date.now()}`
  });
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));