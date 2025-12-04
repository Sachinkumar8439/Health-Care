import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getProviderPatients } from "../handlers"; // your Axios API function

export function ProviderDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getProviderPatients();
        setPatients(data);
      } catch (err) {
        setError(err.message || "Failed to load patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <p style={{ padding: "30px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "30px", color: "red" }}>{error}</p>;

  return (
    <div className="provider-container">
      <h2 className="dash-header">
        <Users size={22} /> Patient List
      </h2>

      <div className="provider-list">
        {patients.map((p, i) => (
          <div key={i} className="provider-item">
            <strong>{p.name}</strong>
            <span className={`status ${p.status.replace(" ", "-")}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
