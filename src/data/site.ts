/**
 * Site-wide data: identity, SEO defaults and navigation.
 *
 * Copy here is limited to what is already confirmed (name, role, focus areas).
 * Anything still undefined is left empty until confirmed — never invented.
 */

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
  url: 'https://nicolas-bruna-portfolio.vercel.app',
  themeColor: '#0A0A0A',
  description:
    'Portfolio of Nicolás Bruna, software developer working across full stack, AI and Linux. Selected work, process and case studies.',
};

/**
 * Phase 1 navigation. Only destinations that exist today are real links:
 * `Projects` points at the homepage "Selected Work" section, `About` at the
 * About page and `Contact` at the Contact page.
 */
export const navigation: NavItem[] = [
  { label: 'Projects', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];