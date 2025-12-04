import api from './ApiService/api';

/* ---------------- Patient ---------------- */

// Fetch patient dashboard
export const getPatientDashboard = async () => {
  const res = await api.get('/patient/dashboard');
  return res.data;
};

// Log steps / sleep / activity
export const logPatientActivity = async (payload) => {
  const res = await api.post('/patient/log', payload);
  return res.data;
};

// Update patient profile
export const updatePatientProfile = async (payload) => {
  const res = await api.put('/patient/profile', payload);
  return res.data;
};

/* ---------------- Provider ---------------- */

// List all patients for provider
export const getProviderPatients = async () => {
  const res = await api.get('/provider/patients');
  return res.data;
};

// Get compliance details for specific patient
export const getPatientCompliance = async (patientId) => {
  const res = await api.get(`/provider/patient/${patientId}`);
  return res.data;
};

/* ---------------- Public ---------------- */

// Get general health articles
export const getPublicHealthInfo = async () => {
  const res = await api.get('/public/health-info');
  return res.data;
};

// Get daily health tip
export const getDailyTip = async () => {
  const res = await api.get('/public/tip');
  return res.data;
};
