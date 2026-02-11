import { Link, useLocation } from "wouter";
import { Particles } from "./Particles";
import { motion } from "framer-motion";
import { Shield, Crosshair, Database, Terminal, Radio } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Shield },
    { href: "/missions", label: "Missions", icon: Crosshair },
    { href: "/logs", label: "System Logs", icon: Terminal },
    { href: "/archive", label: "Archive", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col font-mono">
      {/* Atmospheric Effects */}
      <Particles />
      <div className="fixed inset-0 scanline z-50 pointer-events-none opacity-30 mix-blend-overlay" />
      <div className="fixed inset-0 vignette z-40 pointer-events-none" />

      {/* Top HUD */}
      <header className="relative z-50 border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Radio className="w-8 h-8 text-primary animate-pulse" />
            <div>
              <h1 className="text-2xl text-primary tracking-[0.2em] font-display uppercase text-glow">
                Desert Strike
              </h1>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-blink" />
                System Online // V.2.0.4
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} className="group relative px-6 py-3 overflow-hidden">
                  <div className={`absolute inset-0 bg-primary/10 skew-x-12 transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`} />
                  <div className="relative flex items-center space-x-2 z-10">
                    <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_var(--primary)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full p-6 lg:p-8">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer HUD */}
      <footer className="relative z-50 border-t border-primary/20 bg-background/80 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-xs text-muted-foreground font-mono uppercase">
          <div>SECURE CONNECTION ESTABLISHED</div>
          <div className="flex gap-4">
            <span>Lat: 34.0522 N</span>
            <span>Long: 118.2437 W</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
