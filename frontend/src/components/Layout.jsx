import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    nav("/");
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="logo">Healthcare Wellness Portal</h1>
        <nav>
          {token ? (
            <>
              <Link to="/dashboard">Patient</Link>
              <Link to="/provider">Provider</Link>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        HCLTech Hackathon · Preventive & Wellness Portal
      </footer>
    </div>
  );
}
