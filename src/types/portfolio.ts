export type Category = "Événementiel" | "Communication" | "Recrutement" | "Print";

export type WorkLinkKind = "youtube" | "instagram" | "tiktok" | "facebook" | "site" | "whatsapp" | "other";

export interface WorkLink {
  label: string;
  href: string;
  kind?: WorkLinkKind;
}

export interface WorkVideo {
  /** Lien YouTube complet (watch, youtu.be, shorts) OU identifiant de 11 caractères. */
  url: string;
  start?: number;
  poster?: string;
  orientation?: "landscape" | "portrait";
}

export interface Work {
  slug: string;
  title: string;
  client: string;
  category: Category;
  year?: number;
  /** Chemin dans /public */
  image: string;
  alt?: string;
  /** Couleur de fond de la page quand ce visuel est à l'écran */
  bg: string;
  /** "dark" = texte blanc, "light" = texte noir */
  tone: "dark" | "light";
  /** Rôle d'AURA : à renseigner seulement s'il est confirmé */
  role?: string;
  video?: WorkVideo;
  links?: WorkLink[];
  description?: string;
}
