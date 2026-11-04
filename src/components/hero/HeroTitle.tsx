import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EXPO } from "@/lib/motion";

interface WordSpec {
  text: string;
  accent?: boolean;
  highlight?: boolean;
}
interface LineSpec {
  words: WordSpec[];
  className?: string;
}

const LINES: LineSpec[] = [
  { words: [{ text: "Nous" }, { text: "créons" }] },
  { words: [{ text: "des" }, { text: "expériences", highlight: true }], className: "md:pl-[6vw]" },
  { words: [{ text: "qui", accent: true }, { text: "marquent", accent: true }], className: "md:pl-[14vw]" },
  { words: [{ text: "l'Afrique", highlight: true }], className: "md:pl-[3vw]" },
];

interface LetterDef {
  ch: string;
  order: number;
}
interface BuiltWord extends WordSpec {
  letters: LetterDef[];
}
interface BuiltLine {
  className?: string;
  words: BuiltWord[];
}

let counter = 0;
const BUILT: BuiltLine[] = LINES.map((line) => ({
  className: line.className,
  words: line.words.map((word) => ({
    ...word,
    letters: Array.from(word.text).map((ch) => ({ ch, order: counter++ })),
  })),
}));

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const RADIUS = 170; // rayon d'influence du pointeur (px)
const LIFT = 14; // décalage vertical maximal (px)

interface HeroTitleProps {
  ready: boolean;
  className?: string;
}

/**
 * Titre du hero : révélation lettre par lettre (masque + translation Y) puis réaction au pointeur
 * (les lettres proches se soulèvent et passent au rouge). Uniquement transform et opacity.
 */
export default function HeroTitle({ ready, className = "" }: HeroTitleProps) {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const title = titleRef.current;
    const host = title?.closest("section");
    if (!title || !host) return;

    const letters = Array.from(title.querySelectorAll<HTMLElement>(".hero-letter"));
    const hits = letters.map((el) => el.querySelector<HTMLElement>(".hero-letter-hit"));
    const centers = letters.map(() => ({ x: 0, y: 0 }));
    const level = letters.map(() => 0);
    const pointer = { x: -9999, y: -9999, inside: false };
    let raf = 0;
    let last = 0;
    let lastMeasure = 0;

    const measure = () => {
      const h = host.getBoundingClientRect();
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        centers[i].x = r.left - h.left + r.width / 2;
        centers[i].y = r.top - h.top + r.height / 2 + LIFT * level[i];
      });
    };

    const frame = (now: number) => {
      const dt = clamp((now - last) / 16.667, 0.2, 3);
      last = now;
      const k = 1 - Math.pow(1 - 0.14, dt);
      let busy = false;
      for (let i = 0; i < letters.length; i++) {
        const d = Math.hypot(pointer.x - centers[i].x, pointer.y - centers[i].y);
        const target = pointer.inside ? Math.pow(Math.max(0, 1 - d / RADIUS), 1.6) : 0;
        level[i] += (target - level[i]) * k;
        if (Math.abs(target - level[i]) > 0.003) busy = true;
        letters[i].style.transform = `translate3d(0, ${(-LIFT * level[i]).toFixed(2)}px, 0)`;
        const hit = hits[i];
        if (hit) hit.style.opacity = level[i].toFixed(3);
      }
      raf = busy ? requestAnimationFrame(frame) : 0;
    };

    const ensureLoop = () => {
      if (raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const locate = (e: PointerEvent) => {
      const h = host.getBoundingClientRect();
      pointer.x = e.clientX - h.left;
      pointer.y = e.clientY - h.top;
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      measure();
      lastMeasure = performance.now();
      locate(e);
      pointer.inside = true;
      ensureLoop();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const now = performance.now();
      if (now - lastMeasure > 400) {
        measure(); // les lettres bougent pendant la révélation : on remesure régulièrement
        lastMeasure = now;
      }
      locate(e);
      pointer.inside = true;
      ensureLoop();
    };
    const onLeave = () => {
      pointer.inside = false;
      ensureLoop();
    };

    host.addEventListener("pointerenter", onEnter, { passive: true });
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      letters.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [fine, reduced]);

  return (
    <h1
      ref={titleRef}
      className={`font-display text-[clamp(3.25rem,11.5vw,11.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] ${className}`}
    >
      <span className="sr-only">Nous créons des expériences qui marquent l'Afrique</span>
      <span aria-hidden="true" className="flex flex-col">
        {BUILT.map((line, li) => (
          <span key={li} className={`block -my-[0.2em] overflow-hidden py-[0.2em] ${line.className ?? ""}`}>
            {line.words.map((word, wi) => (
              <span
                key={wi}
                className={`mr-[0.22em] inline-block ${word.highlight ? "hero-hl" : ""} ${
                  word.accent ? "font-serif font-normal italic text-aura-red" : ""
                }`}
              >
                {word.letters.map((l) => (
                  <motion.span
                    key={l.order}
                    className="inline-block"
                    initial={reduced ? false : { y: "115%" }}
                    animate={{ y: ready || reduced ? "0%" : "115%" }}
                    transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.08 + l.order * 0.028 }}
                  >
                    <span className="hero-letter relative inline-block will-change-transform">
                      {l.ch}
                      <span
                        aria-hidden="true"
                        className={`hero-letter-hit pointer-events-none absolute inset-0 opacity-0 ${
                          word.accent ? "text-aura-ink" : "text-aura-red"
                        }`}
                      >
                        {l.ch}
                      </span>
                    </span>
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
