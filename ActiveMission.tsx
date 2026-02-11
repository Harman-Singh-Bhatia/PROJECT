import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useMission } from "@/hooks/use-missions";
import { usePilot, useUpdatePilot } from "@/hooks/use-pilots";
import { useCreateLog } from "@/hooks/use-logs";
import { motion } from "framer-motion";
import { CommandButton } from "@/components/CommandButton";

export default function ActiveMission() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const missionId = parseInt(searchParams.get("missionId") || "0");
  const pilotId = parseInt(searchParams.get("pilotId") || "0");

  const { data: mission } = useMission(missionId);
  const { data: pilot } = usePilot(pilotId);
  const updatePilot = useUpdatePilot();
  const createLog = useCreateLog();

  const [stage, setStage] = useState<"deploying" | "combat" | "result">("deploying");
  const [result, setResult] = useState<"Success" | "Failed" | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mission || !pilot) return;

    // Sequence controller
    const sequence = async () => {
      // 1. Deploying Phase
      let p = 0;
      const interval = setInterval(() => {
        p += 1;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setStage("combat");
          
          // 2. Combat Phase (simulated delay)
          setTimeout(() => {
            calculateOutcome();
          }, 3000);
        }
      }, 50); // 5 seconds deployment
    };

    sequence();
  }, [mission, pilot]);

  const calculateOutcome = async () => {
    if (!mission || !pilot) return;

    // Simple algorithm: (Experience + Morale/2) vs (Risk * 10 + Random Factor)
    const pilotScore = pilot.experience + (pilot.morale / 2);
    const missionScore = (mission.riskLevel * 10) + (Math.random() * 40); // 0-40 random variance
    
    const isSuccess = pilotScore > missionScore;
    const outcome = isSuccess ? "Success" : "Failed";
    setResult(outcome);
    setStage("result");

    // Update Pilot
    const moraleChange = isSuccess ? 5 : -10;
    const experienceChange = isSuccess ? 10 : 2;
    const newStatus = !isSuccess && Math.random() > 0.7 ? "Grounded" : "Available";

    await updatePilot.mutateAsync({
      id: pilot.id,
      experience: pilot.experience + experienceChange,
      morale: Math.max(0, Math.min(100, pilot.morale + moraleChange)),
      status: newStatus
    });

    // Create Log
    await createLog.mutateAsync({
      missionName: mission.name,
      pilotName: pilot.name,
      outcome: outcome,
      details: isSuccess 
        ? `Mission accomplished. Targets neutralized. Unit returning to base.`
        : `Mission failed. Heavy resistance encountered. Unit forced to withdraw.`
    });
  };

  if (!mission || !pilot) return null;

  return (
    <div className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden border border-primary/20 bg-black/40 backdrop-blur-sm">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://pixabay.com/get/gc98ae30be0ea15a19abf3370f7e5ce0d563167f26a95be6a62cdda7ce6c0977e7c029fce2d64b5e90c12f2bfce69bc55f6323858b58e9c08a20e63db6ba0ac03_1280.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      {/* desert landscape texture */}
      
      <div className="relative z-10 w-full max-w-2xl p-8 text-center space-y-8">
        {stage === "deploying" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-display text-primary animate-pulse tracking-widest">
              DEPLOYING UNIT
            </h2>
            <div className="text-xl font-mono text-muted-foreground uppercase">
              {pilot.name} <span className="text-primary mx-2">via</span> {mission.location}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-4 bg-black/50 border border-primary/30 relative overflow-hidden">
              <motion.div 
                className="h-full bg-primary relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shine_1s_infinite]" />
              </motion.div>
            </div>
            <div className="font-mono text-xs text-primary/70 flex justify-between">
              <span>ESTABLISHING UPLINK...</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        )}

        {stage === "combat" && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-24 h-24 border-4 border-primary rounded-full mx-auto animate-spin border-t-transparent" />
            <h2 className="text-2xl font-display text-white tracking-widest animate-pulse">
              ENGAGING HOSTILES
            </h2>
            <div className="font-mono text-sm text-muted-foreground h-20 overflow-hidden">
              <TypewriterText text={[
                "Target acquired...",
                "Calculating trajectory...",
                "Heat signatures detected...",
                "Deploying countermeasures..."
              ]} />
            </div>
          </motion.div>
        )}

        {stage === "result" && (
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-8 bg-black/80 p-12 border border-border shadow-2xl"
          >
            <h2 className={`text-5xl font-display uppercase tracking-widest ${
              result === "Success" ? "text-green-500 text-glow" : "text-red-600 text-glow"
            }`}>
              MISSION {result}
            </h2>
            
            <p className="font-mono text-muted-foreground max-w-md mx-auto">
              {result === "Success" 
                ? "Objectives completed. Intelligence secured. Unit returning to base."
                : "Critical failure. Retreat authorized. Damage assessment required."
              }
            </p>

            <CommandButton onClick={() => setLocation("/")}>
              RETURN TO COMMAND
            </CommandButton>
          </motion.div>
        )}
      </div>

      {/* Cinematic Borders */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
}

// Simple effect for text log
function TypewriterText({ text }: { text: string[] }) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < text.length - 1) {
      const timeout = setTimeout(() => setIndex(prev => prev + 1), 800);
      return () => clearTimeout(timeout);
    }
  }, [index, text.length]);

  return (
    <div className="flex flex-col items-center gap-1">
      {text.slice(0, index + 1).map((line, i) => (
        <span key={i} className="text-primary/70">{line}</span>
      ))}
    </div>
  );
}
