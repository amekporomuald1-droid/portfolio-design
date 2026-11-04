import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";

/**
 * Variantes du curseur, pilotées par l'attribut HTML `data-cursor` :
 *  - "view"   : disque rouge « VOIR » (cartes projet)
 *  - "drag"   : disque bleu « DRAG » (carrousels)
 *  - "native" : curseur système (hero, où les stickers suivent le pointeur)
 *  - "link"   : anneau agrandi (automatique sur liens et boutons)
 */
export type CursorVariant = "default" | "link" | "view" | "drag" | "native";

const VARIANTS: readonly string[] = ["default", "link", "view", "drag", "native"];

export function isCursorVariant(value: unknown): value is CursorVariant {
  return typeof value === "string" && VARIANTS.includes(value);
}

interface CursorContextValue {
  /** true uniquement sur desktop avec souris (pointer: fine). */
  enabled: boolean;
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const enabled = usePointerFine();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const value = useMemo(() => ({ enabled, variant, setVariant }), [enabled, variant]);
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor doit être utilisé dans <CursorProvider>.");
  return ctx;
}
