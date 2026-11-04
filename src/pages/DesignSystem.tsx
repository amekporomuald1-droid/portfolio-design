import Divider from "@/components/ui/Divider";
import Heading, { Accent } from "@/components/ui/Heading";
import Label from "@/components/ui/Label";
import Sticker from "@/components/ui/Sticker";
import TwoBlockButton from "@/components/ui/TwoBlockButton";
import type { StickerName } from "@/components/ui/stickerArt";

const SWATCHES = [
  { name: "Rouge AURA", hex: "#e8001d", cls: "bg-aura-red" },
  { name: "Bordeaux", hex: "#6f001a", cls: "bg-aura-wine" },
  { name: "Encre", hex: "#0d1117", cls: "bg-aura-ink" },
  { name: "Jaune", hex: "#ffd60a", cls: "bg-aura-yellow" },
  { name: "Bleu", hex: "#2b50ff", cls: "bg-aura-blue" },
  { name: "Vert", hex: "#25d366", cls: "bg-aura-green" },
  { name: "Rose", hex: "#ff7ab8", cls: "bg-aura-pink" },
] as const;

const STICKER_NAMES: StickerName[] = [
  "ball", "trophy", "star", "bolt", "flame", "heart",
  "clapper", "mic", "flag", "lba", "y2026", "lome",
];

export default function DesignSystem() {
  return (
    <main className="px-6 py-16 md:px-16">
      <Label>Design system · AURA</Label>
      <Heading as="h1" size="xl" className="mt-6 max-w-5xl">
        Un style <Accent>vivant</Accent> et éditorial
      </Heading>

      <Divider className="my-16" />

      <Label className="mb-6">Couleurs</Label>
      <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-7">
        {SWATCHES.map((c) => (
          <li key={c.name}>
            <div className={`h-24 rounded-sm ${c.cls}`} />
            <p className="mt-2 text-sm font-semibold">{c.name}</p>
            <p className="text-xs opacity-60">{c.hex}</p>
          </li>
        ))}
      </ul>

      <Divider className="my-16" />

      <Label className="mb-6">Titres : tailles md / lg / xl</Label>
      <Heading size="md">Nos <Accent>services</Accent></Heading>
      <Heading size="lg" className="mt-6">Projets <Accent>sélectionnés</Accent></Heading>

      <Divider className="my-16" />

      <Label className="mb-6">Boutons en deux blocs</Label>
      <div className="flex flex-wrap items-center gap-6">
        <TwoBlockButton to="/">Nous contacter</TwoBlockButton>
        <TwoBlockButton variant="dark" href="https://wa.me/22878877216" external>
          WhatsApp
        </TwoBlockButton>
        <TwoBlockButton variant="light" onClick={() => undefined}>
          Voir les projets
        </TwoBlockButton>
      </div>

      <Divider className="my-16" />

      <Label className="mb-6">Stickers</Label>
      <div className="flex flex-wrap items-center gap-8">
        {STICKER_NAMES.map((name, i) => (
          <Sticker
            key={name}
            name={name}
            size={name === "lba" || name === "y2026" || name === "lome" ? 150 : 104}
            rotate={(i % 2 ? 1 : -1) * (4 + ((i * 3) % 9))}
          />
        ))}
      </div>

      <section className="-mx-6 mt-20 bg-aura-ink px-6 py-20 text-white md:-mx-16 md:px-16">
        <Label className="text-white/70">Section sombre</Label>
        <Heading size="lg" className="mt-6 max-w-4xl">
          Du contraste pour créer du <Accent>rythme</Accent>
        </Heading>
        <Divider tone="dark" className="my-10" />
        <TwoBlockButton variant="red">Parlons-en</TwoBlockButton>
      </section>
    </main>
  );
}
