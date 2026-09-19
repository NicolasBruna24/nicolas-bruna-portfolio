/**
 * Progressive enhancement for the site shell.
 *
 * Three small behaviours, all idempotent so this module keeps working once the
 * Astro ClientRouter swaps pages (it re-runs through `astro:page-load`):
 *   1. navbar scroll state (transparent -> translucent surface)
 *   2. mobile navigation disclosure
 *   3. scroll reveal for `[data-reveal]` elements
 *
 * Motion is decorative: with `prefers-reduced-motion: reduce` everything is
 * revealed immediately and no observer is created.
 */

const SCROLL_THRESHOLD = 8;
const DESKTOP_QUERY = '(min-width: 48rem)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const REVEAL_ROOT_MARGIN = '0px 0px -12% 0px';

let scrollListenerBound = false;
let globalMenuListenersBound = false;
let revealObserver: IntersectionObserver | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/* ------------------------------------------------------------- navbar */

function syncNavbarState(): void {
  const navbar = document.querySelector<HTMLElement>('[data-navbar]');
  if (!navbar) return;

  navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
}

function initNavbar(): void {
  syncNavbarState();

  if (scrollListenerBound) return;
  scrollListenerBound = true;
  window.addEventListener('scroll', syncNavbarState, { passive: true });
}

/* --------------------------------------------------------- mobile menu */

interface MenuParts {
  toggle: HTMLButtonElement | null;
  panel: HTMLElement | null;
  label: HTMLElement | null;
}

function menuParts(): MenuParts {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  return {
    toggle,
    panel: document.querySelector<HTMLElement>('[data-menu-panel]'),
    label: toggle?.querySelector<HTMLElement>('[data-menu-toggle-label]') ?? null,
  };
}

function isMenuOpen(): boolean {
  return menuParts().toggle?.getAttribute('aria-expanded') === 'true';
}

function setMenuOpen(open: boolean): void {
  const { toggle, panel, label } = menuParts();
  if (!toggle || !panel) return;

  toggle.setAttribute('aria-expanded', String(open));
  panel.classList.toggle('is-open', open);
  if (label) label.textContent = open ? 'Close' : 'Menu';
}

function initMenu(): void {
  const { toggle, panel } = menuParts();
  if (!toggle || !panel) return;

  if (toggle.dataset.menuBound !== 'true') {
    toggle.dataset.menuBound = 'true';
    toggle.addEventListener('click', () => setMenuOpen(!isMenuOpen()));
    panel.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a')) setMenuOpen(false);
    });
  }

  if (globalMenuListenersBound) return;
  globalMenuListenersBound = true;

  // The panel only exists on small screens: drop the open state when the
  // desktop navigation takes over, and close on Escape from anywhere.
  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isMenuOpen()) return;

    setMenuOpen(false);
    menuParts().toggle?.focus();
  });
}

/* ------------------------------------------------------------- reveal */

function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (elements.length === 0) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    elements.forEach((element) => element.classList.add('is-revealed'));
    return;
  }

  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add('is-revealed');
        revealObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: REVEAL_ROOT_MARGIN },
  );

  elements.forEach((element) => {
    if (element.classList.contains('is-revealed')) return;

    revealObserver?.observe(element);
  });
}

/* --------------------------------------------------------------- boot */

function init(): void {
  initNavbar();
  initMenu();
  initReveal();

  // Tells the inline watchdog in BaseLayout that this module is running, so the
  // CSS fallback is never applied.
  document.documentElement.classList.add('reveal-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Fires on the initial load and after every ClientRouter navigation.
document.addEventListener('astro:page-load', init);