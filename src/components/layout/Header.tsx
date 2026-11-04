import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FullscreenMenu from "@/components/layout/FullscreenMenu";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, SITE } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";

export default function Header({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-16"
      >
        <Link to="/" aria-label="AURA Holding, accueil">
          <Logo />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 border border-aura-red bg-aura-ink p-1.5 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-aura-yellow"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.whatsappPartnerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 bg-aura-red px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-white hover:text-aura-ink"
          >
            Devenir partenaire
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="border border-aura-red bg-aura-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white md:hidden"
        >
          Menu
        </button>
      </motion.header>
      <FullscreenMenu open={open} onClose={close} />
    </>
  );
}
