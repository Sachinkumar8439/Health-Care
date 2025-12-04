import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import Layout from "./components/Layout.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/provider"
          element={
            <PrivateRoute>
              <ProviderDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
