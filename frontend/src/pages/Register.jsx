import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    consent: true,
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);

      if (data.user.role === "provider") nav("/provider");
      else nav("/dashboard");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="provider">Provider</option>
          </select>
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
          />
          I consent to my wellness data being stored for this portal.
        </label>
        <button disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="muted">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
