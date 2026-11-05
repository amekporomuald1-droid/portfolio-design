import type { Category, Work } from "@/types/portfolio";

const WHATSAPP_NUMBER = "22878877216";

export const SITE = {
  name: "AURA Holding",
  tagline: "Agence de communication premium",
  discipline: "Branding · Contenu · Stratégie",
  headline: {
    a: "Branding, contenu",
    b: "&",
    accent: "stratégie",
  },
  city: "Lomé",
  country: "Togo",
  year: 2026,
  whatsappDisplay: "+228 78 87 72 16",
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: "https://www.instagram.com/aura_holding",
  tiktok: "https://www.tiktok.com/@aura_holding",
  email: undefined, // TODO(AURA) : adresse e-mail à confirmer
} as const;

export const ABOUT = {
  title: {
    text: "Bâtir un écosystème africain",
    accent: "moderne",
  },
  intro: "AURA Holding conçoit et développe des projets stratégiques, accompagne des marques fortes et apporte des solutions de communication aux entreprises.",
  vision: "Bâtir un écosystème africain moderne capable de créer, contrôler et valoriser ses propres marques, talents et industries.",
  services: ["Conception de sites web", "Stratégie de communication", "Production de contenu", "Conseil digital"],
  values: ["Excellence", "Créativité stratégique", "Indépendance", "Impact durable"],
} as const;

export const CATEGORIES: readonly Category[] = ["Événementiel", "Communication", "Recrutement", "Print"];

const BLUWA_BG = "#071044";

// L'ordre du tableau = l'ordre d'affichage dans la galerie.
export const WORKS: readonly Work[] = [
  {
    slug: "table-et-harmonie",
    title: "Table & Harmonie",
    client: "Ed Event",
    category: "Événementiel",
    year: 2025,
    image: "/images/travaux/ed-event-table-harmonie.webp",
    alt: "Affiche du brunch Table & Harmonie par Ed Event, code couleur blanc, 7 juin à 15h",
    bg: "#6f001a",
    tone: "dark",
  },
  {
    slug: "bluwa-une-erreur",
    title: "Une erreur, près de 2 millions de FCFA perdus",
    client: "Bluwa",
    category: "Communication",
    image: "/images/travaux/bluwa-une-erreur.webp",
    alt: "Visuel Bluwa : un gérant face à son bureau encombré de documents comptables",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-impatient",
    title: "Impatient de comprendre Bluwa ?",
    client: "Bluwa",
    category: "Communication",
    image: "/images/travaux/bluwa-teasing-impatient.webp",
    alt: "Visuel de teasing Bluwa : une femme pensive, « Bientôt, on vous dit tout »",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-tic-tac",
    title: "Tic Tac Tic Tac…",
    client: "Bluwa",
    category: "Communication",
    image: "/images/travaux/bluwa-teasing-tic-tac.webp",
    alt: "Visuel de teasing Bluwa : un sablier bleu et le texte « Tic Tac »",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-telecharge-app",
    title: "Télécharge l'app",
    client: "Bluwa",
    category: "Communication",
    image: "/images/travaux/bluwa-telecharge-app.webp",
    alt: "Visuel Bluwa : icône de l'application sur un écran de téléphone",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-recrutement-stagiaire",
    title: "Recrutement · Stagiaires Customer Success",
    client: "Bluwa",
    category: "Recrutement",
    year: 2026,
    image: "/images/travaux/bluwa-recrutement-stagiaire.webp",
    alt: "Affiche de recrutement Bluwa pour des stagiaires Customer Success à Lomé",
    bg: "#e6e6ec",
    tone: "light",
  },
  {
    slug: "bluwa-recrutement-commercial",
    title: "Recrutement · Commercial",
    client: "Bluwa",
    category: "Recrutement",
    image: "/images/travaux/bluwa-recrutement-commercial.webp",
    alt: "Affiche de recrutement Bluwa pour un poste de commercial",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-recrutement-customer-success",
    title: "Recrutement · Customer Success",
    client: "Bluwa",
    category: "Recrutement",
    image: "/images/travaux/bluwa-recrutement-customer-success.webp",
    alt: "Affiche de recrutement Bluwa pour un poste de Customer Success en CDD de 6 mois",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "game-night",
    title: "Game Night · Soirée Loup-Garou",
    client: "Ed Event",
    category: "Événementiel",
    image: "/images/travaux/ed-event-game-night.webp",
    alt: "Affiche de la Game Night Ed Event : un pion d'échecs, des dés et des cartes",
    bg: "#0d0d0d",
    tone: "dark",
  },
  {
    slug: "bluwa-flyer-recto",
    title: "Flyer · Recto",
    client: "Bluwa",
    category: "Print",
    image: "/images/travaux/bluwa-flyer-recto.webp",
    alt: "Flyer Bluwa Mobile, face avant et QR code de la face arrière",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-flyer-verso",
    title: "Flyer · Verso",
    client: "Bluwa",
    category: "Print",
    image: "/images/travaux/bluwa-flyer-verso.webp",
    alt: "Flyer Bluwa Commerce : offres POS et distribution avec les packs d'abonnement",
    bg: BLUWA_BG,
    tone: "dark",
  },
  {
    slug: "bluwa-mockup-depliant-ouvert",
    title: "Mockup · Dépliant ouvert",
    client: "Bluwa",
    category: "Print",
    image: "/images/travaux/bluwa-mockup-depliant-ouvert.webp",
    alt: "Mockup du dépliant Bluwa Commerce ouvert sur fond gris",
    bg: "#dcdcdc",
    tone: "light",
  },
  {
    slug: "bluwa-mockup-depliant-couverture",
    title: "Mockup · Dépliant, couverture",
    client: "Bluwa",
    category: "Print",
    image: "/images/travaux/bluwa-mockup-depliant-couverture.webp",
    alt: "Mockup du dépliant Bluwa Mobile avec sa couverture et son QR code",
    bg: "#dcdcdc",
    tone: "light",
  },
  {
    slug: "bluwa-mockup-cartes",
    title: "Mockup · Cartes de visite",
    client: "Bluwa",
    category: "Print",
    image: "/images/travaux/bluwa-mockup-cartes.webp",
    alt: "Mockup des cartes de visite Bluwa, recto et verso",
    bg: "#e4e4e4",
    tone: "light",
  },
  // Exemple de travail vidéo pour tester la Lightbox vidéo (à supprimer une fois la vraie vidéo est ajoutée)
  {
    slug: "demo-video",
    title: "Vidéo démonstration",
    client: "Client Test",
    category: "Communication",
    year: 2026,
    image: "/images/travaux/ed-event-table-harmonie.webp", // vignette temporaire
    alt: "Vignette de la vidéo de démonstration",
    bg: "#000000",
    tone: "dark",
    video: {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // identifiant 11 caractères : dQw4w9WgXcQ
      start: 10,
      poster: "/images/travaux/ed-event-table-harmonie.webp",
      orientation: "landscape",
    },
    description: "Vidéo de démonstration pour tester la Lightbox vidéo",
    links: [{ label: "YouTube", href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", kind: "youtube" }],
  },
];

// MODÈLES POUR AJOUTER UN TRAVAIL
// Exemple de travail image :
// {
//   slug: "mon-projet",
//   title: "Mon projet",
//   client: "Mon Client",
//   category: "Communication",
//   year: 2026,
//   image: "/images/travaux/mon-projet.webp",
//   alt: "Description du visuel",
//   bg: "#couleur",
//   tone: "dark",
//   description: "Description courte (max 160 caractères)",
//   links: [{ label: "Site web", href: "https://example.com", kind: "site" }],
// }

// Exemple de travail vidéo (à ajouter temporairement pour tester la Lightbox vidéo) :
// {
//   slug: "demo-video",
//   title: "Vidéo démonstration",
//   client: "Client Test",
//   category: "Communication",
//   year: 2026,
//   image: "/images/travaux/demo-video-thumb.webp",
//   alt: "Vignette de la vidéo de démonstration",
//   bg: "#000000",
//   tone: "dark",
//   video: {
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // identifiant 11 caractères : dQw4w9WgXcQ
//     start: 10,
//     poster: "/images/travaux/demo-video-thumb.webp",
//     orientation: "landscape",
//   },
//   description: "Vidéo de démonstration pour tester la Lightbox vidéo",
//   links: [{ label: "YouTube", href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", kind: "youtube" }],
// }
