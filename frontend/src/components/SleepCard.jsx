export default function SleepCard({ hours = 0, target = 0 }) {
  const percentage = target ? Math.min(100, Math.round((hours / target) * 100)) : 0;

  return (
    <div className="card">
      <h3>Sleep</h3>
      <p>
        {hours} / {target} hours
      </p>
      <div className="progress">
        <div className="progress-bar" style={{ width: percentage + "%" }} />
      </div>
      <span className="progress-label">{percentage}% of daily target</span>
    </div>
  );
}
