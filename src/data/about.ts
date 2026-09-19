/**
 * About page content — single source of truth for /about.
 *
 * Everything here comes from the confirmed Phase 3A brief or from evidence
 * visible in this portfolio's own case studies. Deliberately NOT claimed:
 * employment, clients, awards, users, revenue, dates, proficiency levels,
 * senior/expert titles, or URLs beyond the verified GitHub and PyPI links.
 */

import { castleArq } from './castlearq';
import type { ProjectAction } from './castlearq';
import { prodLocales } from './prodlocales';
import { snapContext } from './snapcontext';

export interface AboutProjectLink {
  name: string;
  summary: string;
  route: string;
  status?: string;
  blurb: string;
}

export interface AboutTechnologyGroup {
  label: string;
  items: string[];
  note?: string;
}

export interface AboutContent {
  route: string;
  hero: { heading: string; name: string; role: string; intro: string; meta: string[] };
  seo: { title: string; description: string };
  about: { heading: string; body: string[] };
  principles: { heading: string; lead: string; items: { title: string; body: string }[] };
  areas: {
    heading: string;
    lead: string;
    items: { title: string; body: string }[];
    note: string;
  };
  projects: { heading: string; lead: string; items: AboutProjectLink[]; note: string };
  focus: { heading: string; lead: string; items: string[] };
  philosophy: { heading: string; statement: string; body: string[]; quote: string };
  education: { heading: string; items: { title: string; detail: string }[]; note: string };
  technologies: {
    heading: string;
    lead: string;
    groups: AboutTechnologyGroup[];
    note: string;
  };
  direction: { heading: string; body: string[]; interests: string[] };
  closing: { heading: string; body: string; links: ProjectAction[] };
}

export const about: AboutContent = {
  route: '/about',
  hero: {
    heading: 'I build software to understand problems.',
    name: 'Nicolás Bruna',
    role: 'Software Developer',
    intro:
      'I build software around real problems I run into, experiment with technologies along the way, and keep coming back to the same intersection: software, AI and systems.',
    meta: ['Valparaíso, Chile', 'EN / ES'],
  },
  seo: {
    title: 'About | Software Developer',
    description:
      'Nicolás Bruna is a software developer from Chile building software, AI and systems projects — learning by building, experimenting and iterating.',
  },
  about: {
    heading: 'About',
    body: [
      'I am Nicolás Bruna, a software developer from Chile. I studied Ingeniería Informática at INACAP Valparaíso and obtained the Analista Programador qualification.',
      'Most of what I know about software, AI and systems comes from building things: local AI tooling, developer tools, product experiments and full-stack applications. I learn by turning a problem into something executable, investigating why it behaves the way it does, and iterating until the system underneath makes sense.',
      'This portfolio is a record of that process — the problems I chose to investigate, the software that came out of them, and what each project taught me.',
    ],
  },
  principles: {
    heading: 'How I work',
    lead: 'Four principles that describe how I actually build, not a methodology I sell.',
    items: [
      {
        title: 'Build',
        body: 'I learn by turning an idea or a problem into something executable — a script, a tool, a prototype — instead of studying it from a distance.',
      },
      {
        title: 'Investigate',
        body: 'When something does not work, I want to understand why rather than simply bypassing it. The failure is usually where the learning is.',
      },
      {
        title: 'Experiment',
        body: 'I use projects as a way to test technologies, architectures and ideas against real constraints instead of comparing them in the abstract.',
      },
      {
        title: 'Iterate',
        body: 'The first implementation is rarely the final one. I improve systems as I understand them better, and I am comfortable rewriting what I got wrong.',
      },
    ],
  },
  areas: {
    heading: 'What I build',
    lead: 'Areas of interest and current focus — directions I work in, not mastery I claim.',
    items: [
      {
        title: 'Software',
        body: 'Full-stack and backend work: applications, APIs and developer tooling built around concrete problems.',
      },
      {
        title: 'AI',
        body: 'Local AI, model runtimes, inference and AI-assisted development — especially the layer between models and the people running them.',
      },
      {
        title: 'Systems',
        body: 'Linux, infrastructure, networking and the interaction between hardware and software — the environment the code actually runs in.',
      },
      {
        title: 'Architecture',
        body: 'Separation of concerns, abstractions, compatibility decisions and execution pipelines that stay maintainable as they grow.',
      },
    ],
    note: 'These are areas I work in and keep learning about — not a claim of expertise in any of them.',
  },
  projects: {
    heading: 'Evidence, not adjectives',
    lead: 'The three projects in this portfolio, and what each one says about how I work.',
    items: [
      {
        name: castleArq.name,
        summary: castleArq.summary,
        route: castleArq.route,
        blurb: 'Started from a real problem with local AI setup — and turned into architecture work.',
      },
      {
        name: snapContext.name,
        summary: snapContext.summary,
        route: snapContext.route,
        blurb: 'Personal friction with AI-assisted development, turned into reusable tooling.',
      },
      {
        name: prodLocales.name,
        summary: prodLocales.summary,
        route: prodLocales.route,
        status: prodLocales.status,
        blurb: 'A product experiment that taught its lesson — and was deliberately paused.',
      },
    ],
    note: 'Each project has a full case study describing what was built, what was decided and what was learned.',
  },
  focus: {
    heading: 'Current focus',
    lead: 'Where my attention is right now. Not equally advanced — just the direction I am moving in.',
    items: [
      'software architecture',
      'local AI',
      'AI-assisted development',
      'Linux',
      'backend and full-stack development',
      'infrastructure and systems',
      'a stronger professional portfolio',
    ],
  },
  philosophy: {
    heading: 'Learning by building',
    statement: 'Curiosity is useful when it leads to experimentation.',
    body: [
      'My projects usually start before I have all the necessary knowledge: a problem appears, I investigate possible solutions, I build something, I discover its limitations, and my understanding gets sharper with each round.',
      'That means early versions are often wrong in instructive ways. I treat that as part of the process rather than something to hide — the portfolio keeps the reasoning, not just the result.',
    ],
    quote:
      'I build software to solve problems I encounter, then use the process to understand the system underneath.',
  },
  education: {
    heading: 'Education',
    items: [
      { title: 'Ingeniería Informática', detail: 'INACAP — Valparaíso, Chile' },
      { title: 'Analista Programador', detail: 'INACAP' },
    ],
    note: 'What I build matters more here than where I studied — this page keeps education compact on purpose.',
  },
  technologies: {
    heading: 'Technologies',
    lead: 'Tools that appear in the projects and in this portfolio itself. No ratings, no levels — just what the work uses.',
    groups: [
      { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
      { label: 'Development', items: ['Astro', 'VS Code', 'Git'] },
      {
        label: 'AI / local AI',
        items: ['Ollama', 'llama.cpp', 'local model runtimes', 'AI-assisted development tooling'],
      },
      {
        label: 'Systems',
        items: ['Linux', 'Git'],
        note: 'Docker appears only as the sandbox SnapContext uses for risky commands.',
      },
    ],
    note: 'Anything else I touch is either experimental or aspirational — it does not belong in this list yet.',
  },
  direction: {
    heading: 'Professional direction',
    body: [
      'My career is still developing, so I keep this open on purpose. I am interested in work where I can keep building and keep learning — especially where software meets real technical constraints.',
    ],
    interests: [
      'software development',
      'backend / full-stack',
      'AI and software tooling',
      'systems and infrastructure',
      'solving technical problems',
    ],
  },
  closing: {
    heading: 'Still building. Still learning.',
    body: 'This portfolio is a record of the problems I have chosen to investigate, the software I have built, and the systems I am still learning to understand.',
    links: [
      { label: 'Selected work', href: '/#work' },
      { label: 'GitHub', href: 'https://github.com/NicolasBruna24' },
      // /contact now exists, so the About closing links straight to it —
      // no pending pill, no invented email or social URL here.
      { label: 'Contact', href: '/contact' },
    ],
  },
};
