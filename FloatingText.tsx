import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "SYSTEM INITIALIZED",
  "TARGET LOCKED",
  "ALTITUDE 32000FT",
  "AFTERBURNER ENGAGED",
  "SCANNING SECTOR 7",
  "HOSTILES DETECTED",
  "WEAPONS FREE",
];

type FloatItem = { id: number; text: string; x: number; y: number };

export const FloatingText: React.FC = () => {
  const [items, setItems] = useState<FloatItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        text: LINES[Math.floor(Math.random() * LINES.length)],
        x: Math.random() * 80 + 10, // 10% to 90% width
        y: Math.random() * 80 + 10, // 10% to 90% height
      };
      setItems((prev) => [...prev.slice(-4), newItem]); // Keep last 5 items
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 0.6, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute font-mono font-bold text-xs tracking-[0.2em] text-cyan-400/60 select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              textShadow: "0 0 8px rgba(0, 240, 255, 0.4)",
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingText;
