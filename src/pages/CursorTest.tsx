import { Link } from "react-router-dom";
import Divider from "@/components/ui/Divider";
import Heading, { Accent } from "@/components/ui/Heading";
import Label from "@/components/ui/Label";
import TwoBlockButton from "@/components/ui/TwoBlockButton";

const CARDS = [
  { slug: "table-et-harmonie", title: "Table & Harmonie", category: "Événementiel", bg: "bg-aura-red text-white" },
  { slug: "lba-elite-game-2026", title: "LBA Élite Game", category: "Sport", bg: "bg-aura-blue text-white" },
  { slug: "gen-next-academy", title: "Gen-Next Academy", category: "Éducation", bg: "bg-aura-yellow text-aura-ink" },
] as const;

export default function CursorTest() {
  return (
    <main>
      <section data-cursor="native" className="flex min-h-[70vh] flex-col justify-center px-6 md:px-16">
        <Label>Test CustomCursor · zone native (hero)</Label>
        <Heading as="h1" size="xl" className="mt-6 max-w-5xl">
          Ici, la flèche <Accent>normale</Accent>
        </Heading>
        <p className="mt-6 max-w-md text-lg">
          Dans cette zone le curseur personnalisé disparaît : c'est là que les stickers suivent le pointeur.
        </p>
      </section>

      <Divider />

      <section className="px-6 py-24 md:px-16">
        <Label>Hors hero · point + anneau avec inertie</Label>
        <Heading size="lg" className="mt-6">
          Cartes <Accent>projet</Accent> : « VOIR »
        </Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link key={card.slug} to={`/projets/${card.slug}`} data-cursor="view" className="block">
              <div className={`flex aspect-[4/5] items-end p-6 ${card.bg}`}>
                <span className="font-display text-3xl font-extrabold tracking-tight">{card.title}</span>
              </div>
              <Label className="mt-4">{card.category}</Label>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      <section className="py-24 pl-6 md:pl-16">
        <Label>Carrousel</Label>
        <Heading size="lg" className="mt-6">
          Affiches : « <Accent>DRAG</Accent> »
        </Heading>
        <div data-cursor="drag" className="mt-12 flex snap-x gap-6 overflow-x-auto pb-6 pr-6 md:pr-16">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="flex aspect-[3/4] w-[70vw] shrink-0 snap-start items-end bg-aura-ink p-6 text-white md:w-[26vw]"
            >
              <span className="font-display text-2xl font-extrabold">Affiche {i + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-aura-ink px-6 py-24 text-white md:px-16">
        <Label className="text-white/70">Fond sombre · lisibilité du curseur</Label>
        <Heading size="lg" className="mt-6 max-w-3xl">
          Liens et boutons : l'anneau <Accent>grossit</Accent>
        </Heading>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <TwoBlockButton to="/design">Design system</TwoBlockButton>
          <a href="#haut" className="text-sm font-semibold underline underline-offset-4">
            Un lien simple
          </a>
        </div>
        <input
          aria-label="Votre email"
          placeholder="Votre email (curseur natif dans un champ)"
          className="mt-12 block w-full max-w-md border-b border-white/40 bg-transparent py-3 text-white placeholder:text-white/60"
        />
      </section>
    </main>
  );
}
