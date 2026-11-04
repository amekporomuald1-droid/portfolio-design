import type { ElementType, ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export default function Label({ children, as: Tag = "p", className = "" }: LabelProps) {
  return (
    <Tag className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${className}`}>
      {children}
    </Tag>
  );
}
