import { useEffect, useRef } from "react";
import { isCursorVariant, useCursor, type CursorVariant } from "@/context/CursorContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE = "a, button, [role='button'], summary, label";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

/** Détermine la variante selon l'élément survolé (l'ancêtre le plus proche gagne). */
function resolveVariant(target: EventTarget | null): CursorVariant {
  if (!(target instanceof Element)) return "default";
  const el = target.closest<HTMLElement>(`[data-cursor], ${INTERACTIVE}, ${TEXT_FIELDS}`);
  if (!el) return "default";
  const declared = el.dataset.cursor;
  if (isCursorVariant(declared)) return declared;
  if (el.matches(TEXT_FIELDS)) return "native";
  if (el.matches(INTERACTIVE)) return "link";
  return "default";
}

/**
 * Curseur du site (hors hero) : point instantané + anneau avec inertie.
 * Deux couches : l'une en mix-blend-mode "difference" (point + anneau, lisibles sur fond clair
 * et sombre), l'autre normale (disque VOIR / DRAG). Animation : transform et opacity uniquement.
 */
export default function CustomCursor() {
  const { enabled, variant, setVariant } = useCursor();
  const reduced = useReducedMotion();

  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const disc = discRef.current;
    if (!layerA || !layerB || !dot || !ring || !disc) return;

    const html = document.documentElement;
    html.classList.add("cursor-custom");

    const mouse = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let seen = false;
    let visible = false;
    let raf = 0;
    let last = 0;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const setFlag = (name: "visible" | "pressed", on: boolean) => {
      layerA.dataset[name] = String(on);
      layerB.dataset[name] = String(on);
    };

    const show = (on: boolean) => {
      if (visible === on) return;
      visible = on;
      setFlag("visible", on);
    };

    const frame = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 16.667, 0.2), 3);
      last = now;
      const k = reduced ? 1 : 1 - Math.pow(1 - 0.16, dt);
      lag.x += (mouse.x - lag.x) * k;
      lag.y += (mouse.y - lag.y) * k;

      const busy = Math.abs(mouse.x - lag.x) > 0.1 || Math.abs(mouse.y - lag.y) > 0.1;
      if (!busy) {
        lag.x = mouse.x;
        lag.y = mouse.y;
      }
      place(ring, lag.x, lag.y);
      place(disc, lag.x, lag.y);
      raf = busy ? requestAnimationFrame(frame) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!seen) {
        seen = true;
        lag.x = mouse.x;
        lag.y = mouse.y;
        setVariant(resolveVariant(e.target));
      }
      place(dot, mouse.x, mouse.y);
      show(true);
      if (raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setVariant(resolveVariant(e.target));
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && e.button === 0) setFlag("pressed", true);
    };
    const onUp = () => setFlag("pressed", false);
    const onLeave = () => show(false);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    html.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("cursor-custom");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onLeave);
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduced, setVariant]);

  if (!enabled) return null;

  return (
    <>
      <div ref={layerARef} aria-hidden="true" data-variant={variant} className="cursor-layer cursor-blend">
        <div ref={dotRef} className="cursor-pos">
          <div className="cursor-dot" />
        </div>
        <div ref={ringRef} className="cursor-pos">
          <div className="cursor-ring" />
        </div>
      </div>
      <div ref={layerBRef} aria-hidden="true" data-variant={variant} className="cursor-layer">
        <div ref={discRef} className="cursor-pos">
          <div className="cursor-disc" />
          <span className="cursor-label cursor-label--view">Voir</span>
          <span className="cursor-label cursor-label--play">Lire</span>
          <span className="cursor-label cursor-label--drag">Drag</span>
        </div>
      </div>
    </>
  );
}
