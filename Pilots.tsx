import React, { useMemo, useState } from "react";

const pilots = [
  {
    name: "Capt. A. Reyes",
    callsign: "SKYFIRE",
    role: "Strike Lead",
    hours: 2140,
    sorties: 182,
    status: "On Station",
  },
  {
    name: "Lt. N. Karim",
    callsign: "NOMAD",
    role: "Recon",
    hours: 980,
    sorties: 94,
    status: "Ready +05",
  },
  {
    name: "Maj. H. Sinclair",
    callsign: "HALO",
    role: "Mission Commander",
    hours: 3120,
    sorties: 260,
    status: "Command Deck",
  },
  {
    name: "Lt. J. Okada",
    callsign: "VECTOR",
    role: "Escort",
    hours: 740,
    sorties: 66,
    status: "Briefing",
  },
  {
    name: "Capt. R. Silva",
    callsign: "GLACIER",
    role: "Tanker",
    hours: 1850,
    sorties: 140,
    status: "Airborne",
  },
  {
    name: "Lt. L. Novak",
    callsign: "PHOTON",
    role: "EW / Jamming",
    hours: 620,
    sorties: 58,
    status: "Ready +10",
  },
];

export const Pilots: React.FC = () => {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"hours" | "sorties" | "status">("hours");

  const visiblePilots = useMemo(() => {
    const lower = query.toLowerCase();
    const filtered = pilots.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.callsign.toLowerCase().includes(lower) ||
        p.role.toLowerCase().includes(lower) ||
        p.status.toLowerCase().includes(lower)
    );
    return [...filtered].sort((a, b) => {
      if (sortKey === "status") {
        return a.status.localeCompare(b.status);
      }
      return (b as any)[sortKey] - (a as any)[sortKey];
    });
  }, [query, sortKey]);

  return (
    <section className="sky-page">
      <header className="sky-page-header">
        <h1 className="sky-page-title">PILOTS</h1>
      </header>

      <div className="glass-panel" style={{ marginBottom: 14 }}>
        <div className="glass-panel-inner">
          <div className="glass-panel-header">
            <div>
                <div className="glass-title">FILTER</div>
                <div className="glass-subtitle">CREW</div>
            </div>
          </div>
          <div className="glass-body" style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
                placeholder="SEARCH"
              className="pilot-filter-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="pilot-filter-select"
              value={sortKey}
              onChange={(e) =>
                setSortKey(e.target.value as "hours" | "sorties" | "status")
              }
            >
              <option value="hours">Sort by Hours</option>
              <option value="sorties">Sort by Sorties</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pilots-grid">
        {visiblePilots.map((pilot) => (
          <article key={pilot.callsign} className="glass-panel pilot-card">
            <div className="glass-panel-inner">
              <div className="pilot-header">
                <div className="pilot-avatar">
                  {pilot.callsign.charAt(0)}
                </div>
                <div>
                  <div className="pilot-name">{pilot.name}</div>
                  <div className="pilot-callsign">
                    CALLSIGN // {pilot.callsign}
                  </div>
                </div>
              </div>
              <div className="pilot-role">{pilot.role}</div>
              <div className="pilot-meta">
                <span>Hours: {pilot.hours}</span>
                <span>Sorties: {pilot.sorties}</span>
              </div>
            </div>

            <div className="pilot-overlay">
              <div className="pilot-stat-row">
                <span>Night Ops</span>
                <span>{Math.round(pilot.sorties * 0.4)} sorties</span>
              </div>
              <div className="pilot-stat-row">
                <span>Last Checkride</span>
                <span>T‑{Math.round(pilot.sorties / 3)} days</span>
              </div>
              <div className="pilot-stat-row">
                <span>Fatigue Index</span>
                <span>Within limits</span>
              </div>
              <div className="pilot-status">Status: {pilot.status}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

