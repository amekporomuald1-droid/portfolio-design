import type { ElementType, ReactNode } from "react";

type Size = "md" | "lg" | "xl";

const SIZES: Record<Size, string> = {
  md: "text-[clamp(2rem,5vw,4rem)]",
  lg: "text-[clamp(2.75rem,7vw,6.5rem)]",
  xl: "text-[clamp(3.25rem,10vw,10rem)]",
};

interface AccentProps {
  children: ReactNode;
  tone?: "red" | "inherit";
}

/** Le mot clé d'un titre : serif italique, même taille, rouge par défaut. */
export function Accent({ children, tone = "red" }: AccentProps) {
  return (
    <em className={`font-serif font-normal italic ${tone === "red" ? "text-aura-red" : ""}`}>
      {children}
    </em>
  );
}

interface HeadingProps {
  as?: ElementType;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export default function Heading({ as: Tag = "h2", size = "lg", className = "", children }: HeadingProps) {
  return <Tag className={`${SIZES[size]} leading-[0.92] ${className}`}>{children}</Tag>;
}
