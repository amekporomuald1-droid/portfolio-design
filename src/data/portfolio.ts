import type { NavLink, Partner, Project, Service, Stat } from "@/types/portfolio";

const WHATSAPP_NUMBER = "22878877216";

export const SITE = {
  name: "AURA Holding",
  baseline: "Holding panafricaine",
  city: "Lomé",
  country: "Togo",
  tagline: "Nous créons des expériences qui marquent l'Afrique.",
  /** Proposition de texte, à valider par AURA. */
  heroIntro:
    "Basée à Lomé, AURA réunit le sport, l'événementiel, les services aux entreprises et l'éducation autour d'une même ambition : faire rayonner le talent africain.",
  /** Slogan de la LBA (pas d'AURA) : à utiliser uniquement dans le contexte LBA. */
  lbaMission:
    "Premier écosystème communautaire pan-africain qui combine sport, éducation et ascension sociale.",
  whatsappDisplay: "+228 78 87 72 16",
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappPartnerHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Bonjour AURA, je souhaite devenir partenaire.",
  )}`,
  /** Plateforme à confirmer (Instagram, etc.). */
  handle: "@aura_holding",
  // TODO(AURA) : adresse e-mail de contact, date de création, fondateurs à citer.
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { label: "À propos", href: "#manifeste" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Services", href: "#services" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Contact", href: "#contact" },
];

// Images : à déposer dans public/images/affiches/ avec ces noms exacts.
export const PROJECTS: readonly Project[] = [
  {
    slug: "table-et-harmonie",
    title: "Table & Harmonie",
    category: "Événementiel",
    date: "7 juin 2025",
    year: 2025,
    location: "Burger Fabric, Agbalépédo (Lomé)",
    client: "Ed Event",
    // TODO(AURA) : role (conception de l'affiche, communication, co-organisation ?)
    summary: "Un brunch événementiel en blanc, autour d'un menu complet.",
    description:
      "Brunch événementiel avec un menu complet (entrée, plat de résistance, dessert, rafraîchissement) et un code couleur blanc.",
    details: ["Ticket Solo : 10 000 FCFA", "Ticket Duo : 16 000 FCFA", "Ticket Enfants : 5 000 FCFA"],
    cover: "/images/affiches/table-harmonie-affiche.png",
  },
  {
    slug: "lba-elite-game-2026",
    title: "LBA Élite Game 2026",
    category: "Sport",
    year: 2026,
    // TODO(AURA) : date exacte du Grand Soir (à vérifier), lieu, role, résultat marquant
    client: "LBA",
    summary: "L'événement annuel All-Star de la LBA.",
    description:
      "Événement annuel All-Star de la LBA : camp d'évaluation, draft, Grand Soir, gala et documentaire.",
    cover: "/images/affiches/lba-elite-game-logo.png", // logo provisoire, remplacer par l'affiche
  },
  {
    slug: "lba-rising",
    title: "LBA Rising",
    category: "Sport",
    client: "FNTB (co-branding)",
    // TODO(AURA) : date, lieu, role
    summary: "Tournoi 1v1 et Duo Challenge, ouverts à tous.",
    description: "Tournoi 1v1 et Duo Challenge, ouvert à tous les joueurs sans restriction.",
    cover: "/images/affiches/lba-rising.png",
  },
  {
    slug: "nations-league",
    title: "Nations League",
    category: "Sport",
    // TODO(AURA) : date, lieu, role
    summary: "La compétition entre nations d'Afrique de l'Ouest.",
    description:
      "Compétition inter-nations trimestrielle réunissant les meilleures équipes d'Afrique de l'Ouest.",
    cover: "/images/affiches/nations-league.png",
  },
  {
    slug: "gen-next-academy",
    title: "Gen-Next Academy",
    category: "Éducation",
    // TODO(AURA) : confirmer la description (compétition inter-lycées/universités OU camp de détection), date, lieu, role
    summary: "Former les talents de demain.",
    description:
      "Compétition inter-lycées et universités, inspirée de la NCAA, pour former les talents de demain.",
    cover: "/images/affiches/gen-next-academy.png",
  },
  // TODO(AURA) : 6e réalisation à choisir (réelle et confirmée uniquement).
];

export const SERVICES: readonly Service[] = [
  {
    slug: "sport-lba",
    number: "01",
    title: "Sport & LBA",
    description: SITE.lbaMission,
    items: ["Nations League", "LBA Élite Game", "Gen-Next Academy", "LBA Rising"],
  },
  {
    slug: "evenementiel",
    number: "02",
    title: "Événementiel",
    description: "Galas, soirées et brunchs.",
    items: ["Galas", "Soirées", "Brunchs"],
  },
  {
    slug: "services-b2b",
    number: "03",
    title: "Services B2B",
    description: "Accompagnement digital des PME, refonte de marque et de site web, communication.",
    items: ["Accompagnement digital des PME", "Refonte de marque et de site web", "Communication"],
  },
  {
    slug: "education",
    number: "04",
    title: "Éducation",
    description: "Camps de détection et coaching de jeunes.",
    items: ["Camps de détection", "Coaching de jeunes"],
  },
];

export const PARTNERS: readonly Partner[] = [
  { name: "FNTB", note: "Co-branding LBA Rising", confirmed: true },
  { name: "Ed Event", note: "Table & Harmonie", confirmed: true },
  { name: "SANOU", note: "Soirée cinéma", confirmed: false }, // à confirmer avant affichage
];

/** Volontairement vide : aucun chiffre vérifié pour l'instant. */
export const STATS: readonly Stat[] = [];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
