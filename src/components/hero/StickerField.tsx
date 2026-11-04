import { useEffect, useRef, type CSSProperties } from "react";
import Sticker from "@/components/ui/Sticker";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STICKER_SPECS, stickerHeight } from "./stickerSpecs";

interface StickerFieldProps {
  /** "onMove" : visibles seulement pendant le mouvement du pointeur. "always" : toujours visibles. */
  reveal?: "onMove" | "always";
  /** Délai (ms) sans mouvement avant que les stickers disparaissent. */
  idleDelay?: number;
  className?: string;
}

interface Item {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  sv: number;
  op: number;
  rot: number;
  showAt: number;
}

type Mode = "follow" | "float" | "static";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function floatVars(i: number): CSSProperties {
  return {
    "--float-dur": `${5 + (i % 4) * 0.9}s`,
    "--float-delay": `${-i * 0.7}s`,
    "--float-amp": `${8 + (i % 3) * 4}px`,
    "--float-rot": `${(i % 2 ? -1 : 1) * (3 + (i % 3))}deg`,
  } as CSSProperties;
}

/**
 * Stickers du hero. À placer dans un parent `relative` (le hero) : le composant écoute le
 * pointeur sur son parent. La couche ignore les clics (pointer-events: none).
 * - Souris : apparaissent au mouvement, suivent le pointeur avec inertie, disparaissent à l'arrêt.
 * - Tactile : flottent seuls. - prefers-reduced-motion : immobiles.
 */
export default function StickerField({ reveal = "onMove", idleDelay = 280, className = "" }: StickerFieldProps) {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const mode: Mode = reduced ? "static" : fine ? "follow" : "float";

  const layerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (mode !== "follow") return;
    const layer = layerRef.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const always = reveal === "always";
    const heights = STICKER_SPECS.map(stickerHeight);
    const items: Item[] = STICKER_SPECS.map(() => ({
      x: 0, y: 0, vx: 0, vy: 0, s: always ? 1 : 0, sv: 0, op: always ? 1 : 0, rot: 0, showAt: 0,
    }));
    const homes = STICKER_SPECS.map(() => ({ x: 0, y: 0 }));
    const pointer = { x: 0, y: 0, inside: false, lastMove: -Infinity };
    let raf = 0;
    let last = 0;
    let wasFollowing = false;

    const write = (i: number) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      const it = items[i];
      const sp = STICKER_SPECS[i];
      el.style.transform =
        `translate3d(${(it.x - sp.size / 2).toFixed(2)}px, ${(it.y - heights[i] / 2).toFixed(2)}px, 0) ` +
        `rotate(${(sp.rotate + it.rot).toFixed(2)}deg) scale(${it.s.toFixed(3)})`;
      el.style.opacity = it.op.toFixed(3);
    };

    const measure = () => {
      const r = layer.getBoundingClientRect();
      STICKER_SPECS.forEach((sp, i) => {
        homes[i].x = sp.home[0] * r.width;
        homes[i].y = sp.home[1] * r.height;
      });
    };

    const frame = (now: number) => {
      const dt = clamp((now - last) / 16.667, 0.2, 3);
      last = now;

      const moving = now - pointer.lastMove < idleDelay;
      const following = pointer.inside && (always || moving);
      const visible = always || following;

      // Apparition : les stickers surgissent du pointeur, en cascade.
      if (following && !wasFollowing) {
        items.forEach((it, i) => {
          if (!always) {
            it.x = pointer.x;
            it.y = pointer.y;
            it.vx = 0;
            it.vy = 0;
          }
          it.showAt = always ? 0 : now + i * 45;
        });
      }
      wasFollowing = following;

      let busy = following;

      items.forEach((it, i) => {
        const sp = STICKER_SPECS[i];

        if (following) {
          // Suivi avec inertie propre à chaque sticker + léger flottement (sinus).
          const tx = pointer.x + sp.offset[0] + Math.sin(now / 900 + i * 1.7) * 4;
          const ty = pointer.y + sp.offset[1] + Math.cos(now / 1100 + i * 2.3) * 5;
          const k = 1 - Math.pow(1 - sp.lerp, dt);
          const nx = it.x + (tx - it.x) * k;
          const ny = it.y + (ty - it.y) * k;
          it.vx = (nx - it.x) / dt;
          it.vy = (ny - it.y) / dt;
          it.x = nx;
          it.y = ny;
        } else {
          // Retour à l'origine avec effet de ressort.
          it.vx += ((homes[i].x - it.x) * 0.06 - it.vx * 0.2) * dt;
          it.vy += ((homes[i].y - it.y) * 0.06 - it.vy * 0.2) * dt;
          it.x += it.vx * dt;
          it.y += it.vy * dt;
        }

        // Rotation dynamique selon la vitesse.
        const targetRot = clamp(it.vx * 1.2, -16, 16);
        it.rot += (targetRot - it.rot) * (1 - Math.pow(0.85, dt));

        // Échelle (ressort avec rebond) + pop au survol.
        const show = visible && now >= it.showAt;
        const hover = following && show && Math.hypot(pointer.x - it.x, pointer.y - it.y) < sp.size * 0.45;
        const ts = show ? (hover ? 1.15 : 1) : 0;
        it.sv += ((ts - it.s) * 0.16 - it.sv * 0.3) * dt;
        it.s += it.sv * dt;
        if (it.s < 0) {
          it.s = 0;
          it.sv = 0;
        }

        // Opacité.
        const to = show ? 1 : 0;
        it.op += (to - it.op) * (1 - Math.pow(show ? 0.8 : 0.88, dt));
        if (to === 0 && it.op < 0.004) it.op = 0;

        // Totalement masqué : inutile de continuer le ressort.
        if (!always && !following && it.op === 0 && it.s < 0.002) {
          it.x = homes[i].x;
          it.y = homes[i].y;
          it.vx = 0;
          it.vy = 0;
        }

        write(i);

        if (
          !busy &&
          (Math.abs(it.vx) > 0.02 ||
            Math.abs(it.vy) > 0.02 ||
            Math.abs(it.s - ts) > 0.002 ||
            Math.abs(it.sv) > 0.002 ||
            Math.abs(it.op - to) > 0.004 ||
            Math.hypot(homes[i].x - it.x, homes[i].y - it.y) > 0.3)
        ) {
          busy = true;
        }
      });

      raf = busy ? requestAnimationFrame(frame) : 0;
    };

    const ensureLoop = () => {
      if (raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const locate = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = locate(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.inside = true;
      ensureLoop();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = locate(e);
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.inside = true;
      if (dx * dx + dy * dy > 2) pointer.lastMove = performance.now();
      ensureLoop();
    };

    const onLeave = () => {
      pointer.inside = false;
      ensureLoop();
    };

    measure();
    items.forEach((it, i) => {
      it.x = homes[i].x;
      it.y = homes[i].y;
      write(i);
    });

    host.addEventListener("pointerenter", onEnter, { passive: true });
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    const ro = new ResizeObserver(() => {
      measure();
      ensureLoop();
    });
    ro.observe(layer);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [mode, reveal, idleDelay]);

  return (
    <div
      key={mode}
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}
    >
      {STICKER_SPECS.map((sp, i) => (
        <div
          key={sp.name}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          className={`absolute left-0 top-0 flex will-change-transform ${
            mode === "follow" ? "opacity-0" : i >= 5 ? "max-sm:hidden" : ""
          }`}
          style={
            mode === "follow"
              ? { zIndex: sp.z }
              : {
                  left: `${sp.home[0] * 100}%`,
                  top: `${sp.home[1] * 100}%`,
                  zIndex: sp.z,
                  transform: `translate(-50%, -50%) rotate(${sp.rotate}deg)`,
                }
          }
        >
          <div className={mode === "float" ? "sticker-float flex" : "flex"} style={mode === "float" ? floatVars(i) : undefined}>
            <Sticker name={sp.name} size={sp.size} />
          </div>
        </div>
      ))}
    </div>
  );
}
