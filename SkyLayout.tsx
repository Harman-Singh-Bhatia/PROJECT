import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import VideoBackground from "../../components/VideoBackground";
import FloatingText from "../../components/FloatingText";
import { BackgroundAudio } from "../../components/BackgroundAudio";
import "../skystrike.css";

export const SkyLayout: React.FC = () => {
  const [utc, setUtc] = useState<string>(new Date().toUTCString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setUtc(new Date().toUTCString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const intro = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(intro);
  }, []);

  if (loading) {
    return (
      <div className="intro-screen">
        <div className="intro-box">
          <div className="intro-title typing type-anim" data-text="SKYSTRIKE CONTROL ONLINE" />
          <div className="intro-sub">INITIALIZING...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="sky-layout">
      <VideoBackground />
      <FloatingText />
      <BackgroundAudio />
      <Sidebar />

      <div className="sky-main">
        <header className="sky-topbar">
          <div className="status-pill glass">SYSTEM: ONLINE</div>
          <div className="utc-clock glass">{utc}</div>
        </header>

        <main className="sky-content glass">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SkyLayout;
