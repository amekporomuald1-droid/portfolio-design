interface LogoProps {
  tone?: "red" | "white" | "ink";
  className?: string;
}

/** Logo textuel PROVISOIRE : à remplacer par le SVG officiel d'AURA. */
export default function Logo({ tone = "red", className = "" }: LogoProps) {
  const color = tone === "red" ? "text-aura-red" : tone === "white" ? "text-white" : "text-aura-ink";
  return (
    <span className={`inline-flex items-baseline gap-2 font-display font-extrabold leading-none ${color} ${className}`}>
      <span className="text-2xl tracking-[-0.06em]">AURA</span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.3em] opacity-70">Holding</span>
    </span>
  );
}
