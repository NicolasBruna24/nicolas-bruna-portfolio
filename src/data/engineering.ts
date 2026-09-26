/**
 * Engineering section content.
 *
 * Metadata for the /engineering articles lives here, typed, while the Markdown
 * body of each article lives in `src/content/engineering/<slug>.md`. The
 * dynamic page in `src/pages/engineering/[slug].astro` joins the two: the slug
 * in this list must match the Markdown file name, so an article is never
 * described in two places.
 */

export interface EngineeringArticle {
  /** URL slug, must match the Markdown file name in `src/content/engineering/`. */
  slug: string;
  /** Article title, shared with the page metadata. */
  title: string;
  /** One-sentence description, shared with the page metadata. */
  description: string;
  /** ISO publication date (YYYY-MM-DD). */
  pubDate: string;
  /**
   * BCP-47 language the article body is written in. The site itself is in
   * English, so this is what marks the article page as the language it uses.
   */
  lang: string;
  /** Topic chips shown on the article page. */
  tags: string[];
  /**
   * Related project route from the existing case studies (e.g. `/projects/castlearq`).
   * Absent when the article does not tie back to a selected-work project.
   */
  relatedProject?: string;
  relatedProjectName?: string;
}

export const engineeringArticles: EngineeringArticle[] = [
  {
    slug: 'de-ejecutar-ia-local-a-construir-castlearq',
    title: 'De ejecutar IA local a construir CastleArq',
    description:
      'Cómo un problema práctico con la IA local terminó convirtiéndose en la construcción de una arquitectura para hacerla más accesible.',
    pubDate: '2026-09-21',
    // The Markdown body is written in Spanish; the site chrome stays English.
    lang: 'es',
    tags: ['Local AI', 'CastleArq', 'Software Architecture', 'Open Source'],
    relatedProject: '/projects/castlearq',
    relatedProjectName: 'CastleArq',
  },
];
