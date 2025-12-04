import { useEffect, useState } from "react";
import API from "../api/api";

export default function ProviderDashboard() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await API.get("/provider/patients");
        setPatients(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  async function openPatient(p) {
    setSelected(p);
    try {
      const { data } = await API.get(`/provider/patient/${p._id}/compliance`);
      setHistory(data.history || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="dashboard provider">
      <h2>Provider Dashboard</h2>
      <div className="provider-layout">
        <div className="card">
          <h3>Patients</h3>
          {patients.length === 0 && <p className="muted">No patients found.</p>}
          <ul className="list">
            {patients.map((p) => (
              <li key={p._id} onClick={() => openPatient(p)}>
                <strong>{p.name}</strong>
                <span className="muted">{p.email}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Compliance History</h3>
          {!selected && <p className="muted">Select a patient to view details.</p>}
          {selected && history.length === 0 && (
            <p className="muted">No logs for this patient yet.</p>
          )}
          {selected && history.length > 0 && (
            <ul className="list">
              {history.map((h) => (
                <li key={h._id}>
                  {h.date}: {h.complianceScore}% (steps {h.steps}, sleep {h.sleepHours}h)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
