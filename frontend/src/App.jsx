import './App.css';
import './pages.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PatientDashboard } from './pages/patientDashboard';
import { PublicHome } from './pages/PublicPage';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { SignupPage } from './pages/singupPage';
import { useState } from 'react';

function App() {
  const [user,setuser] = useState(null);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={< LoginPage setuser = {setuser} />} />
        <Route path="/register" element={<SignupPage/>} />

        <Route 
          path="/patient/dashboard" 
          element={user ?
              <PatientDashboard user={user} setuser={setuser} /> :<Navigate to="/" />
          } 
        />

        {/* Protected Provider Dashboard */}
        <Route 
          path="/provider/dashboard" 
          element={
              < ProviderDashboard /> 
          } 
        />

        {/* Redirect unknown routes to home */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
