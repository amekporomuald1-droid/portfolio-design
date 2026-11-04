import { STICKERS, type StickerName } from "@/components/ui/stickerArt";

export interface StickerSpec {
  name: StickerName;
  /** Largeur du sticker en px. */
  size: number;
  /** Facteur d'inertie par frame à 60 fps (0.04 = très lent, 0.14 = vif). */
  lerp: number;
  /** Décalage autour du pointeur, en px. */
  offset: readonly [number, number];
  /** Rotation de base en degrés. */
  rotate: number;
  /** Profondeur. */
  z: number;
  /** Position d'origine (fractions de la largeur/hauteur du hero) : tactile, mouvement réduit, retour. */
  home: readonly [number, number];
}

export const STICKER_SPECS: readonly StickerSpec[] = [
  { name: "ball", size: 92, lerp: 0.12, offset: [-120, -60], rotate: -10, z: 6, home: [0.07, 0.22] },
  { name: "lba", size: 132, lerp: 0.07, offset: [95, -115], rotate: 8, z: 8, home: [0.84, 0.14] },
  { name: "trophy", size: 88, lerp: 0.05, offset: [145, 55], rotate: 6, z: 5, home: [0.9, 0.6] },
  { name: "star", size: 64, lerp: 0.14, offset: [-45, 115], rotate: -12, z: 9, home: [0.52, 0.88] },
  { name: "bolt", size: 70, lerp: 0.09, offset: [-160, 55], rotate: 11, z: 4, home: [0.05, 0.72] },
  { name: "flame", size: 82, lerp: 0.06, offset: [-20, -150], rotate: -6, z: 7, home: [0.66, 0.08] },
  { name: "y2026", size: 120, lerp: 0.04, offset: [80, 135], rotate: 5, z: 3, home: [0.78, 0.86] },
  { name: "mic", size: 76, lerp: 0.11, offset: [175, -30], rotate: -8, z: 2, home: [0.3, 0.1] },
];

const PAD = 8; // même marge que dans Sticker.tsx

/** Hauteur rendue du sticker (le SVG garde le ratio de son viewBox). */
export function stickerHeight(spec: StickerSpec): number {
  const [, , w, h] = STICKERS[spec.name].box;
  return (spec.size * (h + PAD * 2)) / (w + PAD * 2);
}
