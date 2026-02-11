// Using Logs component logic but with a different view format (Table)
import { useLogs } from "@/hooks/use-logs";
import { format } from "date-fns";
import { Database } from "lucide-react";

export default function Archive() {
  const { data: logs, isLoading } = useLogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-display text-foreground tracking-widest uppercase">
            Mission Archive
          </h1>
          <p className="text-muted-foreground font-mono text-xs mt-1">
            CLASSIFIED RECORDS // LEVEL 3 CLEARANCE
          </p>
        </div>
        <Database className="w-8 h-8 text-muted-foreground opacity-20" />
      </div>

      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm text-left">
            <thead className="bg-primary/5 text-primary text-xs uppercase tracking-widest border-b border-primary/20">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Operation</th>
                <th className="p-4">Unit</th>
                <th className="p-4">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">Retrieving data...</td>
                </tr>
              ) : logs?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">Archive empty.</td>
                </tr>
              ) : (
                logs?.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="p-4 text-muted-foreground">
                      {log.timestamp ? format(new Date(log.timestamp), "dd MMM yyyy") : "-"}
                    </td>
                    <td className="p-4 font-bold text-foreground group-hover:text-primary transition-colors">
                      {log.missionName}
                    </td>
                    <td className="p-4 text-muted-foreground uppercase">
                      {log.pilotName}
                    </td>
                    <td className="p-4">
                      <span className={`
                        px-2 py-1 text-[10px] uppercase tracking-widest font-bold border
                        ${log.outcome === "Success" 
                          ? "border-green-500/30 text-green-500" 
                          : "border-red-500/30 text-red-500"
                        }
                      `}>
                        {log.outcome}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
