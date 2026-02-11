import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Dashboard" },
  { to: "/missions", label: "Missions" },
  { to: "/active-mission", label: "Active Mission" },
  { to: "/pilots", label: "Pilots" },
  { to: "/logs", label: "Logs" },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sky-sidebar">
      <div className="sky-brand">
        <div className="brand-mark">◎</div>
        <div>
          <div className="brand-title">SKYSTRIKE</div>
          <div className="brand-sub">CONTROL</div>
        </div>
      </div>

      <nav className="sky-nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => `sky-nav-link ${isActive ? "active" : ""}`}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="sky-footer">© SKYSTRIKE</div>
    </aside>
  );
};

export default Sidebar;
