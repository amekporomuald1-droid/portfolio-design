export type Category = "Événementiel" | "Communication" | "Recrutement" | "Print";

export interface Work {
  slug: string;
  title: string;
  client: string;
  category: Category;
  year?: number;
  /** Chemin dans /public */
  image: string;
  alt: string;
  /** Couleur de fond de la page quand ce visuel est à l'écran */
  bg: string;
  /** "dark" = texte blanc, "light" = texte noir */
  tone: "dark" | "light";
  /** Rôle d'AURA : à renseigner seulement s'il est confirmé */
  role?: string;
}