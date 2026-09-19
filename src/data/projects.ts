import { castleArq } from './castlearq';
import { snapContext } from './snapcontext';
import { prodLocales } from './prodlocales';

/**
 * Selected work shown on the homepage.
 *
 * A preview links to its case study as soon as `href` is set; entries without a
 * route stay as `Soon` previews instead of pointing at a missing page. The
 * route, summary and (when the project is not active) its status come from the
 * project's own content module, so a project is never described in two places.
 */
export interface ProjectPreview {
  /** Display index, e.g. "01". */
  index: string;
  name: string;
  /** Short descriptor, or `null` while the final copy is not defined. */
  summary: string | null;
  /** Case-study route, or `null` while the page is not implemented. */
  href: string | null;
  /**
   * Status chip shown instead of "Case study" when the project is not active
   * (e.g. "Paused"). Absent for actively developed projects.
   */
  status?: string;
}

export const selectedProjects: ProjectPreview[] = [
  {
    index: '01',
    name: castleArq.name,
    summary: castleArq.summary,
    href: castleArq.route,
  },
  {
    index: '02',
    name: snapContext.name,
    summary: snapContext.summary,
    href: snapContext.route,
  },
  {
    index: '03',
    name: prodLocales.name,
    summary: prodLocales.summary,
    href: prodLocales.route,
    status: prodLocales.status,
  },
];