import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);

      if (data.user.role === "provider") nav("/provider");
      else nav("/dashboard");
    } catch (err) {
      alert("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </label>
        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="muted">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
