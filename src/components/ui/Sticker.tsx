import { STICKERS, type StickerName } from "./stickerArt";

const PAD = 8;

interface StickerProps {
  name: StickerName;
  /** Largeur en px (la hauteur suit le ratio du dessin). */
  size?: number;
  /** Rotation en degrés (-12 à +12 recommandé). */
  rotate?: number;
  className?: string;
  /** Si fourni, le sticker devient informatif (role="img"). Sinon il est décoratif. */
  label?: string;
}

/**
 * Sticker : dessin SVG + contour blanc épais (même dessin rendu en blanc, épaissi) + ombre portée.
 * La rotation utilise la propriété CSS `rotate`, donc elle se combine avec un `transform`
 * animé sur un parent (StickerField, étape 3).
 */
export default function Sticker({ name, size = 96, rotate = 0, className = "", label }: StickerProps) {
  const art = STICKERS[name];
  const [x, y, w, h] = art.box;

  return (
    <svg
      viewBox={`${x - PAD} ${y - PAD} ${w + PAD * 2} ${h + PAD * 2}`}
      width={size}
      style={{ height: "auto", rotate: `${rotate}deg` }}
      className={`inline-block overflow-visible drop-shadow-[0_6px_8px_rgba(13,17,23,0.25)] ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g className="sticker-outline">{art.node}</g>
      <g>{art.node}</g>
    </svg>
  );
}
