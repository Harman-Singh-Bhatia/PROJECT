import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, ShieldCheck, Lock } from "lucide-react";
import "../../skystrike/skystrike.css";

interface AccessScreenProps {
    onAccessGranted: () => void;
}

export const AccessScreen: React.FC<AccessScreenProps> = ({ onAccessGranted }) => {
    const [callsign, setCallsign] = useState("");
    const [error, setError] = useState(false);
    const [scanning, setScanning] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!callsign.trim()) {
            setError(true);
            return;
        }
        setScanning(true);
        // Simulate biometric/security scan
        setTimeout(() => {
            setScanning(false);
            onAccessGranted();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950 font-orbitron">
            {/* Video Background for Login */}
            <div className="absolute inset-0 z-0">
                <video
                    className="h-full w-full object-cover opacity-40 blur-sm brightness-50 contrast-125"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/jet.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)]"
                >
                    {/* Header */}
                    <div className="relative border-b border-cyan-500/20 bg-cyan-950/20 p-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-cyan-400/30">
                            <Plane className="h-8 w-8 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-black tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                            SKYSTRIKE
                        </h1>
                        <p className="mt-2 text-xs font-bold tracking-widest text-cyan-200/60">
                            RESTRICTED ACCESS // LEVEL 7
                        </p>

                        {/* Corner decorations */}
                        <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-400" />
                        <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-400" />
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-cyan-300/70">
                                    Pilot Callsign
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={callsign}
                                        onChange={(e) => {
                                            setCallsign(e.target.value);
                                            setError(false);
                                        }}
                                        placeholder="ENTER CALLSIGN..."
                                        className="w-full rounded-md border border-cyan-500/30 bg-slate-950/50 px-4 py-3 text-cyan-100 placeholder-cyan-800/50 outline-none transition-all focus:border-cyan-400 focus:bg-slate-900/80 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                                        autoFocus
                                    />
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="absolute -bottom-6 left-0 text-xs font-bold text-red-500 shadow-red-500/20 drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]"
                                        >
                                            ! IDENTITY REQUIRED
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={scanning}
                                className="group relative overflow-hidden rounded-md bg-cyan-500/10 px-6 py-3 font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {scanning ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <ShieldCheck className="h-5 w-5" />
                                            </motion.div>
                                            VERIFYING...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="h-4 w-4" />
                                            AUTHENTICATE
                                        </>
                                    )}
                                </span>

                                {/* Button scan effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                                <div className="absolute inset-0 border border-cyan-500/30 rounded-md" />
                            </button>
                        </form>
                    </div>

                    {/* Footer - Fake Status */}
                    <div className="grid grid-cols-2 border-t border-cyan-500/10 bg-slate-950/30 px-6 py-3 text-[10px] font-mono tracking-widest text-cyan-600/50">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                            SERVER: ONLINE
                        </div>
                        <div className="text-right">
                            V.3.4.1 // ENCRYPTED
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative HUD Elements */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute left-[10%] top-[20%] h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute right-[10%] bottom-[20%] h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute left-1/2 top-10 h-[1px] w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            </div>
        </div>
    );
};
