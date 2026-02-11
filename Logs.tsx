import { useLogs } from "@/hooks/use-logs";
import { format } from "date-fns";
import { Terminal } from "lucide-react";

export default function Logs() {
  const { data: logs, isLoading } = useLogs();

  if (isLoading) {
    return <div className="text-primary font-mono text-center mt-20">DECRYPTING LOGS...</div>;
  }

  // Sort logs by timestamp descending (assuming newer first, though schema doesn't strictly enforce, default ID sort usually works)
  const sortedLogs = [...(logs || [])].reverse();

  return (
    <div className="max-w-4xl mx-auto h-[75vh] flex flex-col">
      <div className="flex items-center gap-3 mb-6 border-b border-primary/30 pb-4">
        <Terminal className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-display text-primary tracking-widest uppercase">
          System Logs // Restricted Access
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto bg-black/40 border border-primary/20 p-6 font-mono text-sm shadow-inner custom-scrollbar space-y-4">
        {sortedLogs.length === 0 ? (
          <div className="text-muted-foreground italic">No entries found in mainframe.</div>
        ) : (
          sortedLogs.map((log) => (
            <div key={log.id} className="border-l-2 border-primary/30 pl-4 py-1 hover:bg-white/5 transition-colors group">
              <div className="flex gap-4 text-xs text-muted-foreground mb-1">
                <span className="text-primary/70">
                  [{log.timestamp ? format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss") : "UNKNOWN"}]
                </span>
                <span className="uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  OP: {log.missionName}
                </span>
                <span>//</span>
                <span className="uppercase">PILOT: {log.pilotName}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className={`uppercase font-bold tracking-widest text-xs py-0.5 px-2 border ${
                  log.outcome === "Success" 
                    ? "border-green-500/30 text-green-500 bg-green-500/5" 
                    : "border-red-500/30 text-red-500 bg-red-500/5"
                }`}>
                  {log.outcome}
                </span>
                <p className="text-gray-400">
                  {log.details || "No operational details recorded."}
                </p>
              </div>
            </div>
          ))
        )}
        
        {/* Terminal Cursor */}
        <div className="flex items-center gap-2 mt-4 text-primary animate-pulse">
          <span>{'>'}</span>
          <span className="w-2 h-4 bg-primary" />
        </div>
      </div>
    </div>
  );
}
