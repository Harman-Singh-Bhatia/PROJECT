import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const BackgroundAudio: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                // Attempt to play if not muted
                if (audioRef.current && !muted) {
                    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
                }
            }
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("keydown", handleInteraction);
        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };
    }, [hasInteracted, muted]);

    useEffect(() => {
        if (audioRef.current) {
            if (muted) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
            }
        }
    }, [muted]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop>
                <source src="/background-ambience.mp3" type="audio/mp3" />
            </audio>
            <button
                onClick={() => setMuted(!muted)}
                className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-cyan-400 hover:bg-black/60 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                aria-label={muted ? "Unmute" : "Mute"}
            >
                {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>
    );
};
