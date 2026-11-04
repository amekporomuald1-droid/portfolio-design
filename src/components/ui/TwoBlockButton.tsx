import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "red" | "dark" | "light";

interface TwoBlockButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Lien interne (React Router). */
  to?: string;
  /** Lien externe ou mailto/tel. */
  href?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  className?: string;
}

const STYLES: Record<Variant, { label: string; arrow: string }> = {
  red: {
    label: "bg-aura-red text-white",
    arrow: "bg-aura-wine text-white group-hover:bg-aura-ink group-focus-visible:bg-aura-ink",
  },
  dark: {
    label: "bg-aura-ink text-white",
    arrow:
      "bg-aura-red text-white group-hover:bg-aura-yellow group-hover:text-aura-ink group-focus-visible:bg-aura-yellow group-focus-visible:text-aura-ink",
  },
  light: {
    label: "bg-white text-aura-ink ring-1 ring-aura-ink/15",
    arrow: "bg-aura-ink text-white group-hover:bg-aura-red group-focus-visible:bg-aura-red",
  },
};

/** Bouton en deux blocs : libellé + petit carré avec flèche. Au survol, la flèche pivote et le carré change de couleur. */
export default function TwoBlockButton({
  children,
  variant = "red",
  to,
  href,
  external = false,
  onClick,
  type = "button",
  className = "",
}: TwoBlockButtonProps) {
  const s = STYLES[variant];

  const content = (
    <>
      <span className={`flex items-center px-7 py-4 transition-colors duration-500 ease-expo ${s.label}`}>
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`flex w-14 items-center justify-center transition-colors duration-500 ease-expo ${s.arrow}`}
      >
        <ArrowRight
          className="h-5 w-5 transition-transform duration-500 ease-expo group-hover:-rotate-45 group-focus-visible:-rotate-45"
          strokeWidth={2.5}
        />
      </span>
    </>
  );

  const cls = `group inline-flex items-stretch gap-[3px] font-display text-sm font-extrabold uppercase tracking-[0.08em] ${className}`;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
