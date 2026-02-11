import React, { useEffect, useRef } from "react";
import "../skystrike/skystrike.css";

export const VideoBackground: React.FC = () => {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      const vid = vidRef.current;
      if (!el || !vid) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // subtle parallax
      vid.style.transform = `translate(${x * 10}px, ${y * 6}px) scale(1.02)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="video-bg" ref={wrapperRef}>
      <video
        ref={vidRef}
        className="video-jet"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/jet.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay" />

      <div className="hud-scan" aria-hidden />
    </div>
  );
};

export default VideoBackground;
