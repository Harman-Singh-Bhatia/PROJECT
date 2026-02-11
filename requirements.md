## Packages
framer-motion | Cinematic animations, transitions, and particle effects
lucide-react | Military-style icons (already in base but confirming usage)
clsx | Conditional class merging
tailwind-merge | Class conflict resolution

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["'Black Ops One', cursive", "var(--font-display)"],
  sans: ["'Rajdhani', sans-serif", "var(--font-sans)"],
  mono: ["'Share Tech Mono', monospace", "var(--font-mono)"],
}

Colors need to be added to Tailwind config as CSS variables for the theme.
