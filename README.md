# Nicolás Bruna — Portfolio

Personal developer portfolio. Astro + TypeScript, plain CSS, no UI framework.

A record of the problems I investigate, the software I build, and what each project teaches me.

## Case studies

- **CastleArq** — local AI runtime and orchestration tooling (open source)
- **SnapContext** — AI coding assistant with project-aware context preparation (open source)
- **ProdLocales** — local product pricing web application (paused)

## Commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:4321
npm run check     # astro check (types + Astro diagnostics)
npm run build     # astro check, then a static production build into dist/
npm run preview   # serve the built output locally
```

## Structure

```
public/                     static assets (favicon, robots.txt)
src/
  components/
    Navbar.astro            fixed navbar + mobile disclosure (scroll state)
    NavList.astro           footer navigation list
    NavLinks.astro          navigation list shared by navbar, panel and footer
    ScrollCue.astro         scroll-triggered cue element
    Seo.astro               title, description, Open Graph defaults
    Footer.astro            footer
    home/
      Hero.astro            opening statement + scroll indicator
      ScrollStory.astro     Problem -> Research -> Experiment -> Build -> Improve
      SelectedWork.astro    "Selected Work" section
      ProjectPreview.astro  one project row
    project/
      ArchitectureDiagram.astro  labelled architecture band diagram
      CaseStudyHero.astro         case study header
      FlowChain.astro             ordered step chain
      ProjectActions.astro        action links (live / source / docs)
  data/
    site.ts                 identity, SEO defaults, navigation
    projects.ts             selected-work preview data
    process.ts              scroll-storytelling steps
    castlearq.ts            CastleArq case-study content
    snapcontext.ts          SnapContext case-study content
    prodlocales.ts          ProdLocales case-study content
    about.ts                About page content
    contact.ts              Contact page content
  layouts/
    BaseLayout.astro        global document shell, fonts, motion bootstrap
  pages/
    index.astro             homepage
    about.astro             about page
    contact.astro           contact page
    projects/castlearq.astro      CastleArq case study
    projects/snapcontext.astro      SnapContext case study
    projects/prodlocales.astro      ProdLocales case study
  scripts/
    ui.ts                   navbar scroll state, mobile menu, scroll reveal
  styles/
    tokens.css              design tokens (color, type, space, motion)
    global.css              reset, layout, buttons, reveal system
```

## Conventions

- **Colors, type, spacing and motion come from `src/styles/tokens.css`.** No hard-coded
  color values in components. Breakpoints (`48rem` tablet, `64rem` desktop) are written as
  literals in media queries because CSS custom properties cannot be used there.
- **Contrast rule:** `--color-text-secondary` for any informative text;
  `--color-text-muted` only for decorative text that is `aria-hidden`.
- **Motion is decorative.** `[data-reveal]` elements are hidden only when JavaScript is
  available (`has-js`), revealed by `src/scripts/ui.ts`, and shown immediately under
  `prefers-reduced-motion: reduce`.
- **Navigation never points at a missing route.** Entries without an `href` in
  `src/data/site.ts` render as non-interactive labels.

## Production domain

The production domain is not yet configured. The `site` option in `astro.config.mjs` and
the `url` field in `src/data/site.ts` are intentionally left empty, with a `TODO(publish)`
marker, so `canonical` and `og:url` are omitted rather than guessed. Domain configuration
belongs to a later phase.