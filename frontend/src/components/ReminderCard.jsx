export default function ReminderCard({ title, description, dueDate, status }) {
  const badgeClass =
    status === "completed" ? "badge badge-green" :
    status === "missed" ? "badge badge-red" :
    "badge badge-yellow";

  return (
    <div className="card">
      <h4>{title}</h4>
      {description && <p className="muted">{description}</p>}
      {dueDate && <p className="muted">Due: {new Date(dueDate).toLocaleDateString()}</p>}
      <span className={badgeClass}>{status || "pending"}</span>
    </div>
  );
}
