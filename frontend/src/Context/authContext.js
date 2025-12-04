// authContext.js (React Auth Context with role-based JWT session)
import { createContext, useContext, useEffect, useState } from "react";
import api from "./api"; 
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded.user);
      } catch (err) {
        console.error("Invalid token");
        logout();
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });
      const jwt = res.data.token;
      const decoded = jwtDecode(jwt);

      setToken(jwt);
      setUser(decoded.user);
      localStorage.setItem("token", jwt);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // Registration
  async function register(data, role = "patient") {
    try {
      const res = await api.post(`/auth/register/${role}`, data);
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    // patient functions
    getPatientDashboard,
    logPatientActivity,
    updatePatientProfile,
    // provider functions
    getProviderPatients,
    getProviderPatientDetails,
    // public
    getHealthArticles,
    getDailyTip
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

async function getPatientDashboard() {
  try {
    const res = await api.get("/patient/dashboard");
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

async function logPatientActivity(data) {
  try {
    const res = await api.post("/patient/log", data);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

async function updatePatientProfile(data) {
  try {
    const res = await api.put("/patient/profile", data);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

// PROVIDER
async function getProviderPatients() {
  try {
    const res = await api.get("/provider/patients");
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

async function getProviderPatientDetails(id) {
  try {
    const res = await api.get(`/provider/patient/${id}`);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

// PUBLIC ROUTES
async function getHealthArticles() {
  try {
    const res = await api.get("/public/health-info");
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

async function getDailyTip() {
  try {
    const res = await api.get("/public/tip");
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}