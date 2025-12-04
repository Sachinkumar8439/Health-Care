import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getPatientDashboard } from "../handlers";

export function PatientDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getPatientDashboard();
        setDashboard(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p style={{ padding: "30px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "30px", color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dash-header">Welcome, {dashboard.name} 👋</h2>

      <div className="dash-grid">
        {/* Steps */}
        <div className="dash-card">
          <h3>Steps</h3>
          <div className="progress-bar">
            <div style={{ width: `${dashboard.stepsPercentage}%` }} />
          </div>
          <p>{dashboard.steps} / {dashboard.stepsGoal} steps</p>
        </div>

        {/* Sleep */}
        <div className="dash-card">
          <h3>Sleep Tracker</h3>
          <p>{dashboard.sleep} hours</p>
        </div>

        {/* Active Time */}
        <div className="dash-card">
          <h3>Active Time</h3>
          <p>{dashboard.activeTime} minutes</p>
        </div>

        {/* Reminders */}
        <div className="dash-card">
          <h3>Preventive Reminders</h3>
          <ul className="reminders">
            {dashboard.reminders.map((reminder, i) => (
              <li key={i}>
                <Bell size={16} /> {reminder}
              </li>
            ))}
          </ul>
        </div>

        {/* Health Tip */}
        <div className="dash-card tip">
          <h3>Health Tip of the Day</h3>
          <p>{dashboard.healthTip}</p>
        </div>
      </div>
    </div>
  );
}
