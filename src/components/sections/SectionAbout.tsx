import { ABOUT } from "@/data/portfolio";

export default function SectionAbout() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32"
      role="tabpanel"
      aria-labelledby="tab-about"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="tab-about" className="mb-12 text-3xl md:text-5xl">
          À propos
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="mb-4 text-xl font-semibold md:text-2xl">Qui sommes-nous</h3>
            <p className="text-lg leading-relaxed text-gray-700">{ABOUT.intro}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold md:text-2xl">Notre vision</h3>
            <p className="text-lg leading-relaxed text-gray-700">{ABOUT.vision}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold md:text-2xl">Nos valeurs</h3>
            <ul className="flex flex-wrap gap-3">
              {ABOUT.values.map((value) => (
                <li
                  key={value}
                  className="rounded-full border-2 border-gray-300 px-4 py-2 text-sm font-semibold uppercase tracking-wider"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
