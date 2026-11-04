interface DividerProps {
  tone?: "light" | "dark";
  className?: string;
}

/** Fine ligne 1px, 15 % d'opacité. "dark" = pour les sections sombres. */
export default function Divider({ tone = "light", className = "" }: DividerProps) {
  return (
    <hr
      className={`m-0 h-px w-full border-0 ${tone === "light" ? "bg-aura-ink/15" : "bg-white/15"} ${className}`}
    />
  );
}
