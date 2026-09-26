/**
 * Contact page content.
 *
 * Only confirmed contact methods appear here:
 *  - email (explicitly authorized for the portfolio, used as a plain mailto:)
 *  - GitHub and LinkedIn profiles (the verified URLs from `site.identity`,
 *    also used in the footer and in the site's structured data)
 * No phone, Discord, X or other social profiles are invented.
 */

import { site } from './site';

export interface ContactCategory {
  title: string;
  body: string;
}

export interface ContactContent {
  route: string;
  hero: {
    heading: string;
    subtitle: string;
    intro: string;
  };
  seo: { title: string; description: string };
  email: {
    address: string;
    href: string;
    label: string;
  };
  github: {
    label: string;
    handle: string;
    href: string;
  };
  /** LinkedIn profile, using the shared verified identity URL. */
  linkedin: {
    label: string;
    /** Link text: the professional name, not the profile URL slug. */
    handle: string;
    href: string;
  };
  categories: {
    heading: string;
    items: ContactCategory[];
    note: string;
  };
  closing: {
    heading: string;
    body: string;
  };
}

export const contact: ContactContent = {
  route: '/contact',
  hero: {
    heading: "Let's build something.",
    subtitle: 'Have a project, opportunity, or technical problem worth discussing?',
    intro:
      'For professional opportunities, collaborations, or technical conversations, feel free to get in touch.',
  },
  seo: {
    title: 'Contact',
    description:
      "Get in touch with Nicolás Bruna, software developer from Chile — professional opportunities, collaborations and technical conversations.",
  },
  email: {
    address: 'brunafuentealba@gmail.com',
    href: 'mailto:brunafuentealba@gmail.com',
    label: 'Email Nicolás Bruna at brunafuentealba@gmail.com',
  },
  github: {
    label: 'GitHub',
    handle: 'NicolasBruna24',
    href: site.identity.github,
  },
  linkedin: {
    label: 'LinkedIn',
    handle: site.identity.displayName,
    href: site.identity.linkedin,
  },
  categories: {
    heading: 'What to contact me about',
    items: [
      {
        title: 'Professional opportunities',
        body: 'Software development, backend/full-stack, AI/software tooling, systems and related technical roles.',
      },
      {
        title: 'Collaboration',
        body: 'Open-source projects, developer tooling, AI/local AI and interesting technical problems.',
      },
      {
        title: 'Technical conversations',
        body: 'Software architecture, AI-assisted development, local AI, Linux and systems.',
      },
    ],
    note: 'These are areas of interest — not guarantees of expertise or services offered.',
  },
  closing: {
    heading: 'Have something in mind?',
    body: 'Write to me, or explore the work first and then get in touch.',
  },
};
