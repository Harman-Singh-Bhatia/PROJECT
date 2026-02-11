import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-6 border border-red-500/30 p-12 bg-black/40 backdrop-blur-sm max-w-md">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display text-red-500 tracking-widest">ERROR 404</h1>
          <p className="font-mono text-muted-foreground uppercase text-sm">
            Signal Lost // Coordinates Invalid
          </p>
        </div>

        <p className="text-sm text-gray-500">
          The requested sector does not exist or has been redacted from the database.
        </p>

        <Link href="/" className="inline-block mt-4 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-mono uppercase tracking-widest text-sm">
          Return to Command
        </Link>
      </div>
    </div>
  );
}
