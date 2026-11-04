export type Category = "Sport" | "Événementiel" | "Services B2B" | "Éducation";

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  /** Date lisible (ex. « 7 juin 2025 »). Omise si non confirmée. */
  date?: string;
  year?: number;
  location?: string;
  /** Client ou partenaire. */
  client?: string;
  /** Rôle d'AURA : à ne renseigner que s'il est confirmé. */
  role?: string;
  /** Une phrase, pour les cartes. */
  summary: string;
  description: string;
  /** Informations pratiques (tickets, format…). */
  details?: string[];
  /** Chemin d'image dans /public (ex. /images/affiches/xxx.png). */
  cover?: string;
  gallery?: string[];
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  description: string;
  items: string[];
  /** Image qui suit le pointeur au survol (optionnelle). */
  image?: string;
}

export interface Partner {
  name: string;
  note?: string;
  /** Logo (SVG/PNG transparent) : à ne renseigner qu'avec l'autorisation du partenaire. */
  logo?: string;
  /** true seulement si le partenariat est confirmé par AURA. */
  confirmed: boolean;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
