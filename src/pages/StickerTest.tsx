import { useState } from "react";
import StickerField from "@/components/hero/StickerField";
import Heading, { Accent } from "@/components/ui/Heading";
import Label from "@/components/ui/Label";
import TwoBlockButton from "@/components/ui/TwoBlockButton";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Reveal = "onMove" | "always";

export default function StickerTest() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const [reveal, setReveal] = useState<Reveal>("onMove");

  const mode = reduced
    ? "mouvement réduit (stickers immobiles)"
    : fine
      ? "souris (suivi du pointeur)"
      : "tactile (flottement seul)";

  return (
    <main>
      <section data-cursor="native" className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-16">
        <div className="relative z-10">
          <Label>Test StickerField · mode : {mode}</Label>
          <Heading as="h1" size="xl" className="mt-6 max-w-5xl">
            Bougez la <Accent>souris</Accent>
          </Heading>
          <p className="mt-6 max-w-md text-lg">
            Les stickers n'apparaissent que pendant le mouvement et disparaissent à l'arrêt.
          </p>
          <div className="mt-10">
            <TwoBlockButton to="/design">Voir le design system</TwoBlockButton>
          </div>
          <div className="mt-8 flex gap-3">
            {(["onMove", "always"] as const).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={reveal === r}
                onClick={() => setReveal(r)}
                className={`border border-aura-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  reveal === r ? "bg-aura-ink text-white" : "bg-transparent"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <StickerField reveal={reveal} />
      </section>

      <section className="flex min-h-[60vh] items-center bg-aura-ink px-6 text-white md:px-16">
        <p className="text-lg">Zone hors hero : aucun sticker ne doit apparaître ici.</p>
      </section>
    </main>
  );
}
