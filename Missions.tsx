import { useState } from "react";
import { useMissions } from "@/hooks/use-missions";
import { usePilots } from "@/hooks/use-pilots";
import { CommandButton } from "@/components/CommandButton";
import { PilotCard } from "@/components/PilotCard";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, AlertOctagon, X } from "lucide-react";

export default function Missions() {
  const { data: missions } = useMissions();
  const { data: pilots } = usePilots();
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);
  const [selectedPilotId, setSelectedPilotId] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const selectedMission = missions?.find(m => m.id === selectedMissionId);
  const selectedPilot = pilots?.find(p => p.id === selectedPilotId);

  const handleDeploy = () => {
    if (selectedMissionId && selectedPilotId) {
      setLocation(`/active-mission?missionId=${selectedMissionId}&pilotId=${selectedPilotId}`);
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-display text-primary text-glow uppercase">Mission Control</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">SELECT OPERATION PROTOCOL</p>
        </div>
        <div className="text-right font-mono text-xs text-muted-foreground">
          AVAILABLE OPS: {missions?.length || 0}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions?.map((mission) => (
          <motion.div
            key={mission.id}
            onClick={() => {
              setSelectedMissionId(mission.id);
              setSelectedPilotId(null);
            }}
            whileHover={{ y: -5 }}
            className={`
              relative p-6 cursor-pointer transition-all duration-300 border bg-card overflow-hidden group
              ${selectedMissionId === mission.id 
                ? 'border-primary shadow-[0_0_20px_rgba(192,86,33,0.15)] ring-1 ring-primary/50' 
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            {selectedMissionId === mission.id && (
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            )}
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                {mission.name}
              </h3>
              <span className={`text-xs font-bold px-2 py-1 border ${
                mission.difficulty === "Easy" ? "border-green-500 text-green-500" :
                mission.difficulty === "Medium" ? "border-yellow-500 text-yellow-500" :
                "border-red-500 text-red-500"
              }`}>
                {mission.difficulty}
              </span>
            </div>

            <div className="space-y-3 font-mono text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {mission.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Duration: {mission.duration} Hours
              </div>
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-primary" />
                Risk Level: {mission.riskLevel}/10
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pilot Selection Overlay */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-background border-l border-primary/30 shadow-2xl z-50 p-6 flex flex-col"
          >
            <div className="absolute inset-0 bg-black/50 -z-10 backdrop-blur-md" />
            <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-display text-primary">Deploy Unit</h2>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  TARGET: {selectedMission.name}
                </p>
              </div>
              <button 
                onClick={() => setSelectedMissionId(null)}
                className="p-2 hover:bg-primary/20 rounded-full transition-colors text-muted-foreground hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Available Personnel
              </div>
              {pilots?.map((pilot) => (
                <PilotCard
                  key={pilot.id}
                  pilot={pilot}
                  selected={selectedPilotId === pilot.id}
                  onClick={() => setSelectedPilotId(pilot.id)}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-4 text-sm font-mono">
                <span className="text-muted-foreground">PROBABILITY OF SUCCESS:</span>
                <span className={`font-bold ${
                  selectedPilot 
                    ? (selectedPilot.experience > selectedMission.riskLevel * 10 ? 'text-green-500' : 'text-orange-500')
                    : 'text-muted-foreground'
                }`}>
                  {selectedPilot 
                    ? Math.min(95, Math.max(10, 50 + (selectedPilot.experience - selectedMission.riskLevel * 10) + (selectedPilot.morale / 10))).toFixed(0)
                    : "--"}%
                </span>
              </div>
              <CommandButton 
                onClick={handleDeploy}
                disabled={!selectedPilotId}
                className="w-full"
              >
                {selectedPilotId ? "AUTHORIZE DEPLOYMENT" : "SELECT PILOT"}
              </CommandButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
