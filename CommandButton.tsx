import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CommandButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export function CommandButton({ 
  variant = "primary", 
  className, 
  children, 
  disabled,
  ...props 
}: CommandButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40",
    secondary: "bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60",
    danger: "bg-destructive/20 text-destructive border-destructive/50 hover:bg-destructive/30 hover:shadow-destructive/20",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, letterSpacing: "0.05em" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      className={cn(
        "px-6 py-3 border font-mono uppercase tracking-widest text-sm font-bold transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
      
      {/* Scanline effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_1s_infinite] pointer-events-none" />
      
      {children}
    </motion.button>
  );
}
