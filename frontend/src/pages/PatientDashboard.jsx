import { useEffect, useState } from "react";
import API from "../api/api";
import StepsCard from "../components/StepsCard.jsx";
import SleepCard from "../components/SleepCard.jsx";
import ReminderCard from "../components/ReminderCard.jsx";

export default function PatientDashboard() {
  const [data, setData] = useState(null);
  const [logForm, setLogForm] = useState({
    steps: "",
    sleepHours: "",
    waterIntakeML: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/patient/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setLogForm((f) => ({ ...f, [name]: value }));
  }

  async function submitLog(e) {
    e.preventDefault();
    try {
      await API.post("/patient/log", {
        steps: Number(logForm.steps) || 0,
        sleepHours: Number(logForm.sleepHours) || 0,
        waterIntakeML: Number(logForm.waterIntakeML) || 0,
      });
      alert("Activity logged!");
      const res = await API.get("/patient/dashboard");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to log activity");
    }
  }

  if (!data) return <div>Loading dashboard...</div>;

  const { user, goals, todayLog, complianceScore, reminders } = data;

  return (
    <div className="dashboard">
      <h2>Hi {user.name}, your wellness overview</h2>
      <p className="muted">Daily compliance: {complianceScore}%</p>

      <div className="grid">
        <StepsCard
          current={todayLog?.steps || 0}
          target={goals?.dailyStepsTarget || 8000}
        />
        <SleepCard
          hours={todayLog?.sleepHours || 0}
          target={goals?.dailySleepTarget || 8}
        />
        <div className="card">
          <h3>Water Intake</h3>
          <p>
            {todayLog?.waterIntakeML || 0} /{" "}
            {goals?.waterIntakeTargetML || 2000} ml
          </p>
        </div>
      </div>

      <section className="section">
        <h3>Log Today&apos;s Activity</h3>
        <form className="log-form" onSubmit={submitLog}>
          <input
            name="steps"
            type="number"
            placeholder="Steps"
            value={logForm.steps}
            onChange={handleChange}
          />
          <input
            name="sleepHours"
            type="number"
            placeholder="Sleep hours"
            value={logForm.sleepHours}
            onChange={handleChange}
          />
          <input
            name="waterIntakeML"
            type="number"
            placeholder="Water (ml)"
            value={logForm.waterIntakeML}
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </section>

      <section className="section">
        <h3>Preventive Reminders</h3>
        <div className="grid">
          {(reminders || []).length === 0 && (
            <p className="muted">No reminders yet.</p>
          )}
          {(reminders || []).map((r) => (
            <ReminderCard key={r._id} {...r} />
          ))}
        </div>
      </section>
    </div>
  );
}
