import { motion } from "framer-motion";
import Label from "@/components/ui/Label";
import { SITE } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ContactSlide() {
  const reduced = useReducedMotion();

  const mainLink = SITE.email
    ? { label: SITE.email, href: `mailto:${SITE.email}` }
    : { label: SITE.whatsappDisplay, href: SITE.whatsappHref };

  const secondaryLinks = [];
  if (SITE.whatsappHref && !SITE.email) {
    secondaryLinks.push({ label: "WhatsApp", href: SITE.whatsappHref });
  }
  if (SITE.instagram) {
    secondaryLinks.push({ label: "Instagram", href: SITE.instagram });
  }
  if (SITE.tiktok) {
    secondaryLinks.push({ label: "TikTok", href: SITE.tiktok });
  }
  if (SITE.email) {
    secondaryLinks.push({ label: "WhatsApp", href: SITE.whatsappHref });
  }

  return (
    <section className="flex h-[100dvh] flex-col justify-between px-6 py-32 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }}
      >
        <Label>Contact</Label>
      </motion.div>

      <div className="flex max-w-4xl flex-col gap-12">
        <motion.h2
          className="font-display text-[clamp(2rem,6vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        >
          Parlons de <em className="font-serif font-normal italic" style={{ color: "var(--accent)" }}>votre projet</em>
        </motion.h2>

        <motion.div
          className="flex flex-col gap-6"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.08 }}
        >
          <a
            href={mainLink.href}
            target={SITE.email ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="font-display text-[clamp(2rem,6vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] transition-colors hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            {mainLink.label}
          </a>

          {secondaryLinks.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {secondaryLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 text-base font-semibold uppercase tracking-[0.2em] transition-colors hover:opacity-70"
                >
                  {link.label}
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.72 }}
        className="flex flex-col gap-2"
      >
        <Label>{SITE.city}, {SITE.country}</Label>
        <Label className="text-white/40">© {SITE.year} {SITE.name}. Tous droits réservés.</Label>
      </motion.div>
    </section>
  );
}
