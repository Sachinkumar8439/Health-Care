import './App.css';
import './pages.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PatientDashboard } from './pages/patientDashboard';
import { PublicHome } from './pages/PublicPage';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { SignupPage } from './pages/singupPage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage/>} />

        <Route 
          path="/patient/dashboard" 
          element={
              <PatientDashboard /> 
          } 
        />

        {/* Protected Provider Dashboard */}
        <Route 
          path="/provider/dashboard" 
          element={
              <ProviderDashboard /> 
          } 
        />

        {/* Redirect unknown routes to home */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
