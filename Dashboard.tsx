import { usePilots } from "@/hooks/use-pilots";
import { useMissions } from "@/hooks/use-missions";
import { CommandButton } from "@/components/CommandButton";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Users, Crosshair, AlertTriangle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { data: pilots, isLoading: pilotsLoading } = usePilots();
  const { data: missions, isLoading: missionsLoading } = useMissions();
  const [, setLocation] = useLocation();

  if (pilotsLoading || missionsLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="text-primary font-mono animate-pulse text-xl">LOADING TACTICAL DATA...</div>
      </div>
    );
  }

  const activePilots = pilots?.filter(p => p.status === "Available").length || 0;
  const groundedPilots = pilots?.filter(p => p.status === "Grounded").length || 0;
  const highRiskMissions = missions?.filter(m => m.riskLevel > 7).length || 0;

  const stats = [
    { label: "Active Personnel", value: activePilots, icon: Users, color: "text-green-500" },
    { label: "Grounded", value: groundedPilots, icon: AlertTriangle, color: "text-red-500" },
    { label: "Pending Missions", value: missions?.length || 0, icon: Crosshair, color: "text-primary" },
    { label: "High Risk Ops", value: highRiskMissions, icon: AlertTriangle, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-6 relative overflow-hidden group hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color} opacity-80`} />
              <div className="text-4xl font-display font-bold text-foreground">{stat.value}</div>
            </div>
            <div className="text-sm uppercase tracking-widest text-muted-foreground font-mono">
              {stat.label}
            </div>
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-current opacity-10 ${stat.color}`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
        {/* Mission Briefing Panel */}
        <div className="lg:col-span-2 bg-card border border-border p-8 relative flex flex-col">
          <div className="absolute top-0 right-0 p-2 text-[10px] text-primary/50 font-mono">
            SEC_LEVEL_01 // EYES ONLY
          </div>
          
          <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
            <Crosshair className="text-primary w-6 h-6" />
            Active Operations
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {missions?.map((mission) => (
              <div 
                key={mission.id}
                className="flex items-center justify-between p-4 border border-border/50 bg-black/20 hover:bg-primary/5 transition-colors group"
              >
                <div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {mission.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    LOC: {mission.location} // RISK: {mission.riskLevel}/10
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-primary mb-1">DURATION</span>
                  <span className="font-mono text-foreground">{mission.duration}h</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <CommandButton onClick={() => setLocation("/missions")}>
              Initiate Operation
            </CommandButton>
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-card border border-border p-8 flex flex-col justify-between relative">
          <div>
            <h2 className="text-2xl font-display mb-6 text-foreground">System Status</h2>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">SERVER UPTIME</span>
                <span className="text-green-500">99.9%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">COMMS LINK</span>
                <span className="text-green-500">STABLE</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">THREAT LEVEL</span>
                <span className="text-orange-500 animate-pulse">ELEVATED</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">WEATHER</span>
                <span className="text-foreground">SANDSTORM</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/10 border border-primary/20 text-xs font-mono text-primary/80 mt-4">
            WARNING: Atmospheric interference detected in Sector 7. 
            Drone surveillance efficiency reduced by 15%.
          </div>
        </div>
      </div>
    </div>
  );
}
