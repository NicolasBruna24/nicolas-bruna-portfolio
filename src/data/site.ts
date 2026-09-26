/**
 * Site-wide data: identity, SEO defaults and navigation.
 *
 * Copy here is limited to what is already confirmed (name, role, focus areas).
 * Anything still undefined is left empty until confirmed — never invented.
 */

/**
 * A public profile that belongs to the person behind the site.
 *
 * `rel: 'me'` is the standard HTML signal that the linked profile and the
 * linking page represent the same person; it is only used for profiles that
 * have been verified against each other.
 */
export interface IdentityProfile {
  /** Visible link label. */
  label: string;
  /** Verified profile URL. */
  href: string;
  /** Marks the profile as belonging to the same person (`rel="me"`). */
  rel: 'me';
}

/**
 * Identity used for structured data and for every link that connects this site
 * to the person's public profiles, so `name`, the canonical URL, GitHub and
 * LinkedIn are each defined in exactly one place for the whole site.
 */
export interface SiteIdentity {
  /** Full name. Structured data uses it; the site itself displays `displayName`. */
  fullName: string;
  /** Professional name shown across the site. */
  displayName: string;
  /**
   * Other verified spellings of the same person: the professional name used by
   * the site's own copy and the names shown on the public profiles below. No
   * spelling is added that is not already published somewhere.
   */
  alternateNames: string[];
  /** GitHub profile that belongs to this person. */
  github: string;
  /** LinkedIn profile that belongs to this person. */
  linkedin: string;
  /**
   * Topics this site itself claims for the person, copied from the areas,
   * focus and technologies published on /about. Never extended with anything
   * the site does not already state.
   */
  knowsAbout: string[];
  /** Verified external profiles, in the order they should be displayed. */
  profiles: IdentityProfile[];
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
  /** BCP-47 language of the article body, e.g. "es". */
  lang: string;
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

/**
 * Professional name. Written once and reused as the site's display name and as
 * the first `alternateName` of the Person node.
 */
const displayName = 'Nicolás Bruna';

/**
 * Verified public profiles. The URLs are written once here and reused by
 * `identity.github` / `identity.linkedin` and by the footer and contact links,
 * so a profile URL never drifts between two copies.
 */
const githubProfile = 'https://github.com/NicolasBruna24';
const linkedinProfile = 'https://www.linkedin.com/in/nicol%C3%A1s-bruna-fuentealba-6086b8410/';

/**
 * Identity source of truth. Only facts that are already published by the site
 * or by the verified profiles themselves appear here.
 */
const identity: SiteIdentity = {
  fullName: 'Nicolás Isaías Bruna Fuentealba',
  displayName,
  // Verified spellings: the professional name used across the site, the name
  // shown by the GitHub profile README and its display name, and the handle.
  alternateNames: ['Nicolás Bruna Fuentealba', 'Nicolas Bruna Fuentealba', 'NicolasBruna24'],
  github: githubProfile,
  linkedin: linkedinProfile,
  knowsAbout: [
    'Software development',
    'Full-stack and backend development',
    'Local AI',
    'AI-assisted development',
    'Linux',
    'Software architecture',
    'Systems and infrastructure',
  ],
  profiles: [
    { label: 'GitHub', href: githubProfile, rel: 'me' },
    { label: 'LinkedIn', href: linkedinProfile, rel: 'me' },
  ],
};

export const site: SiteConfig = {
  name: displayName,
  role: 'Software Developer',
  focus: 'Full Stack · AI · Linux',
  tagline: 'I build software that solves real problems.',
  locale: 'en',
  url: 'https://www.nicobrunaf.dev',
  themeColor: '#0A0A0A',
  description:
    'Portfolio of Nicolás Bruna, software developer working across full stack, AI and Linux. Selected work, process and case studies.',
  identity,
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