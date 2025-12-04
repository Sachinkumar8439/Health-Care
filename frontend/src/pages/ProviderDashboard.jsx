import { Mail, Lock, User, Activity, HeartPulse, Bell, Sun, Moon, Users } from "lucide-react";
export function ProviderDashboard() {
const patients = [
{ name: "David", status: "Good" },
{ name: "Amit", status: "Low Activity" },
{ name: "Sarah", status: "Excellent" },
];


return (
<div className="provider-container">
<h2 className="dash-header"><Users size={22} /> Patient List</h2>


<div className="provider-list">
{patients.map((p, i) => (
<div key={i} className="provider-item">
<strong>{p.name}</strong>
<span className={`status ${p.status}`}>{p.status}</span>
</div>
))}
</div>
</div>
);
}