import { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState(token ? "products" : "login");

  function onLogin(t) {
    setToken(t);
    localStorage.setItem("token", t);
    setPage("products");
  }

  function logout() {
    setToken("");
    localStorage.removeItem("token");
    setPage("login");
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 700, margin: "40px auto" }}>
      <h2>MiniShop</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {token && (
          <>
            <button onClick={() => setPage("products")}>Products</button>
            <button onClick={() => setPage("cart")}>Cart</button>
            <button onClick={() => setPage("checkout")}>Checkout</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      {!token ? (
        <Login onLogin={onLogin} />
      ) : page === "products" ? (
        <Products token={token} />
      ) : page === "cart" ? (
        <Cart token={token} />
      ) : (
        <Checkout token={token} />
      )}
    </div>
  );
}