/**
 * Site-wide data: identity, SEO defaults and navigation.
 *
 * Copy here is limited to what is already confirmed (name, role, focus areas).
 * Anything still undefined is left empty until confirmed — never invented.
 */

/**
 * Identity used for structured data. It holds the full name and the verified
 * public profiles, so `name`, the canonical URL and GitHub are each defined in
 * exactly one place for the whole site.
 */
export interface SiteIdentity {
  /** Full name. Structured data uses it; the site itself displays `name`. */
  fullName: string;
  /** GitHub profile that belongs to this person. */
  github: string;
}

/**
 * Structured-data facts for a project page. It only carries what the project's
 * own data already states: the canonical `@id`s and the reference to the shared
 * `Person` are added centrally by `src/components/Seo.astro`.
 */
export interface ProjectEntity {
  /** Schema.org type that describes the project itself. */
  type: 'SoftwareApplication';
  /** Project name, shared with the page copy. */
  name: string;
  /** One-sentence description, shared with the page metadata. */
  description: string;
  /** Public source repository, when the project has one. */
  codeRepository?: string;
  /** Public installation or distribution page, when the project has one. */
  installUrl?: string;
}

export interface ArticleEntity {
  /** Article headline, shared with the page metadata. */
  title: string;
  /** One-sentence description, shared with the page metadata. */
  description: string;
  /** ISO publication date (YYYY-MM-DD). */
  pubDate: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  focus: string;
  tagline: string;
  /** Value for <html lang>. */
  locale: string;
  /** Production origin, e.g. "https://example.com". Empty until confirmed. */
  url: string;
  /** Mirrors --color-bg for the browser UI; meta tags cannot read CSS variables. */
  themeColor: string;
  /** Default meta description. */
  description: string;
  /** Shared identity for structured data. */
  identity: SiteIdentity;
}

/** A navigation destination. Items without `href` are planned routes. */
export interface NavItem {
  label: string;
  /** Present only for destinations that already exist. */
  href?: string;
}

export const site: SiteConfig = {
  name: 'Nicolás Bruna',
  role: 'Software Developer',
  focus: 'Full Stack · AI · Linux',
  tagline: 'I build software that solves real problems.',
  locale: 'en',
  url: 'https://www.nicobrunaf.dev',
  themeColor: '#0A0A0A',
  description:
    'Portfolio of Nicolás Bruna, software developer working across full stack, AI and Linux. Selected work, process and case studies.',
  identity: {
    fullName: 'Nicolás Isaías Bruna Fuentealba',
    github: 'https://github.com/NicolasBruna24',
  },
};

/**
 * Phase 1 navigation. Only destinations that exist today are real links:
 * `Projects` points at the homepage "Selected Work" section, `About` at the
 * About page and `Contact` at the Contact page.
 */
export const navigation: NavItem[] = [
  { label: 'Projects', href: '/#work' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];