import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("qa@test.com");
  const [password, setPassword] = useState("1234");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const data = await login(email, password);
      onLogin(data.token);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
      <div>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign in</button>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </form>
  );
}