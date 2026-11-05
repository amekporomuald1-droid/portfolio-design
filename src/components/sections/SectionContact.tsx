import { SITE } from "@/data/portfolio";

export default function SectionContact() {
  const contactLink = SITE.email
    ? `mailto:${SITE.email}`
    : SITE.whatsappHref;

  const contactLabel = SITE.email ? SITE.email : SITE.whatsappDisplay;

  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32"
      role="tabpanel"
      aria-labelledby="tab-contact"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="tab-contact" className="mb-12 text-3xl md:text-5xl">
          Contact
        </h2>

        <div className="space-y-16">
          <div>
            <p className="mb-8 text-2xl md:text-3xl">
              Parlons de <span className="font-serif italic">votre projet</span>
            </p>
            <a
              href={contactLink}
              className="block text-4xl font-bold uppercase tracking-tighter md:text-6xl hover:underline"
              data-cursor="link"
            >
              {contactLabel}
            </a>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold uppercase tracking-wider hover:underline"
              data-cursor="link"
            >
              WhatsApp
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold uppercase tracking-wider hover:underline"
              data-cursor="link"
            >
              Instagram
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold uppercase tracking-wider hover:underline"
              data-cursor="link"
            >
              TikTok
            </a>
          </div>

          <p className="text-sm text-gray-500">
            © {SITE.year} {SITE.name}
          </p>
        </div>
      </div>
    </section>
  );
}
