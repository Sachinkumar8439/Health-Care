export default function StepsCard({ current = 0, target = 0 }) {
  const percentage = target ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <div className="card">
      <h3>Steps</h3>
      <p>
        {current} / {target} steps
      </p>
      <div className="progress">
        <div className="progress-bar" style={{ width: percentage + "%" }} />
      </div>
      <span className="progress-label">{percentage}% of daily target</span>
    </div>
  );
}
