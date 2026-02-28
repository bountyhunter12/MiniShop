import { validateLoginInput, calculateCartTotal, validateCheckout } from "../validators.js";
import { products } from "../data.js";

test("login requires email and password", () => {
  expect(validateLoginInput("", "")).toEqual({ ok: false, error: "Email and password required" });
});

test("login rejects invalid email", () => {
  expect(validateLoginInput("abc", "1234").ok).toBe(false);
});

test("cart total calculates correctly", () => {
  const cart = [{ productId: 1, qty: 2 }, { productId: 2, qty: 1 }];
  expect(calculateCartTotal(cart, products)).toBe(38); // 2*15 + 1*8
});

test("checkout rejects short address", () => {
  expect(validateCheckout({ name: "A", address: "x", paymentMethod: "card" }).ok).toBe(false);
});