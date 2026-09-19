/**
 * Scroll storytelling: how the work moves from problem to improvement.
 *
 * Short, generic descriptions of the working method. Final copy lives here
 * directly; PORTFOLIO_SPEC.md was never created, so this file is authoritative.
 */
export interface ProcessStep {
  /** Display index, e.g. "01". */
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Problem',
    description: 'Start from the actual need, not from the tool that happens to be popular.',
  },
  {
    index: '02',
    title: 'Research',
    description: 'Read, compare and understand the constraints before writing any code.',
  },
  {
    index: '03',
    title: 'Experiment',
    description: 'Prototype the risky parts early, in the smallest possible form.',
  },
  {
    index: '04',
    title: 'Build',
    description: 'Turn the validated idea into something small, real and maintainable.',
  },
  {
    index: '05',
    title: 'Improve',
    description: 'Measure what shipped, refactor what hurts and iterate on the rest.',
  },
];