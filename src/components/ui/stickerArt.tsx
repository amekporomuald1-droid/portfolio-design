import type { ReactNode } from "react";

export type StickerName =
  | "ball"
  | "trophy"
  | "star"
  | "bolt"
  | "flame"
  | "heart"
  | "clapper"
  | "mic"
  | "flag"
  | "lba"
  | "y2026"
  | "lome";

export interface StickerArt {
  /** [x, y, largeur, hauteur] du dessin dans son repère SVG. */
  box: readonly [number, number, number, number];
  node: ReactNode;
}

const SQUARE = [0, 0, 100, 100] as const;
const PILL = [0, 0, 150, 56] as const;

function pill(label: string, bg: string, fg: string): ReactNode {
  return (
    <>
      <rect width="150" height="56" rx="28" fill={bg} />
      <text
        x="75"
        y="39"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill={fg}
        style={{ fontFamily: '"Plus Jakarta Sans Variable", system-ui, sans-serif', letterSpacing: "-0.02em" }}
      >
        {label}
      </text>
    </>
  );
}

export const STICKERS: Record<StickerName, StickerArt> = {
  ball: {
    box: SQUARE,
    node: (
      <>
        <circle cx="50" cy="50" r="42" fill="#ff7a1a" />
        <g fill="none" stroke="#0d1117" strokeWidth="3.5" strokeLinecap="round">
          <path d="M50 8V92M8 50H92" />
          <path d="M20 20C38 36 38 64 20 80" />
          <path d="M80 20C62 36 62 64 80 80" />
          <circle cx="50" cy="50" r="42" />
        </g>
      </>
    ),
  },
  trophy: {
    box: SQUARE,
    node: (
      <>
        <path d="M30 24C8 24 8 52 34 56" fill="none" stroke="#ffd60a" strokeWidth="7" strokeLinecap="round" />
        <path d="M70 24C92 24 92 52 66 56" fill="none" stroke="#ffd60a" strokeWidth="7" strokeLinecap="round" />
        <path d="M28 10H72V40C72 56 62 66 50 66C38 66 28 56 28 40Z" fill="#ffd60a" />
        <rect x="44" y="64" width="12" height="16" fill="#ffd60a" />
        <rect x="30" y="80" width="40" height="12" rx="3" fill="#0d1117" />
        <path
          d="M38 20V40C38 48 43 54 48 56"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  star: {
    box: SQUARE,
    node: (
      <polygon
        points="50,8 60.6,37.4 91.8,38.4 67.1,57.6 75.9,87.6 50,70 24.1,87.6 32.9,57.6 8.2,38.4 39.4,37.4"
        fill="#ffd60a"
      />
    ),
  },
  bolt: {
    box: SQUARE,
    node: <polygon points="58,6 20,56 46,56 38,94 80,40 54,40" fill="#2b50ff" />,
  },
  flame: {
    box: SQUARE,
    node: (
      <>
        <path
          d="M50 6C54 24 78 36 78 62C78 80 66 94 50 94C34 94 22 80 22 62C22 50 28 42 34 36C34 46 38 50 42 50C40 34 44 18 50 6Z"
          fill="#e8001d"
        />
        <path d="M50 56C56 64 62 70 62 78C62 86 56 90 50 90C44 90 38 86 38 78C38 70 46 64 50 56Z" fill="#ffd60a" />
      </>
    ),
  },
  heart: {
    box: SQUARE,
    node: (
      <path
        d="M50 88C20 64 10 46 10 32C10 20 19 12 30 12C39 12 46 17 50 25C54 17 61 12 70 12C81 12 90 20 90 32C90 46 80 64 50 88Z"
        fill="#ff7ab8"
      />
    ),
  },
  clapper: {
    box: SQUARE,
    node: (
      <>
        <rect x="10" y="42" width="80" height="46" rx="5" fill="#0d1117" />
        <g transform="rotate(-12 12 40)">
          <rect x="10" y="24" width="80" height="16" rx="3" fill="#0d1117" />
          <path d="M24 24L34 24L26 40L16 40ZM46 24L56 24L48 40L38 40ZM68 24L78 24L70 40L60 40Z" fill="#fff" />
        </g>
        <path d="M18 56H82M18 68H62" stroke="#ffd60a" strokeWidth="4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  mic: {
    box: SQUARE,
    node: (
      <>
        <rect x="34" y="8" width="32" height="52" rx="16" fill="#2b50ff" />
        <path
          d="M22 46C22 66 34 76 50 76C66 76 78 66 78 46"
          fill="none"
          stroke="#0d1117"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M50 76V90M36 92H64" stroke="#0d1117" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path
          d="M42 22H58M42 32H58M42 42H58"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
      </>
    ),
  },
  flag: {
    box: SQUARE,
    node: (
      <>
        <rect x="18" y="8" width="8" height="86" rx="4" fill="#0d1117" />
        <path
          d="M26 14C42 6 54 22 70 14C80 10 86 12 90 14V54C86 52 80 50 70 54C54 62 42 46 26 54Z"
          fill="#25d366"
        />
      </>
    ),
  },
  lba: { box: PILL, node: pill("LBA", "#e8001d", "#ffffff") },
  y2026: { box: PILL, node: pill("2026", "#ffd60a", "#0d1117") },
  lome: { box: PILL, node: pill("LOMÉ", "#2b50ff", "#ffffff") },
};
