// import { useState } from "react";
import { Mail, Lock, User, Activity, HeartPulse, Bell, Sun, Moon, Users } from "lucide-react";
import { Link } from "react-router-dom";
export function PublicHome() {
  const cards = [
    {
      title: "COVID Guidelines",
      icon: Sun,
      desc: "Latest safety & prevention tips",
    },
    {
      title: "Flu Prevention",
      icon: HeartPulse,
      desc: "Seasonal flu safety guide",
    },
    {
      title: "Mental Health",
      icon: Moon,
      desc: "Daily mental wellness habits",
    },
  ];

  return (
    <div className="public-page">
      <nav className="nav">
        <p>Home</p>
        <p>Health Topics</p>
        <p>Services</p>
        <p>Contact</p>
        <Link to={"/login"}>login</Link>
      </nav>

      <h1 className="public-title">Seasonal Health Content</h1>

      <div className="card-grid">
        {cards.map((c, i) => (
          <div className="info-card" key={i}>
            <c.icon size={40} />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
