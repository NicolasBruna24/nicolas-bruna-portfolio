/**
 * ProdLocales case-study content.
 *
 * Single source of truth for the /projects/prodlocales page, following the
 * same pattern as the CastleArq and SnapContext modules: the homepage
 * "Selected Work" preview reads the route, summary and status from here, so
 * the project is never described twice.
 *
 * IMPORTANT — what this page can and cannot claim.
 * There is no public repository for ProdLocales and no local source tree to
 * inspect. Everything stated here comes from what is documented about the
 * project: it was built as a product experiment about local product pricing
 * and analytics, as a web application with its data hosted on Supabase, and
 * development is currently paused. The hosted Supabase database pauses
 * automatically after a period of inactivity — a platform behaviour, not a
 * product failure. Deliberately NOT claimed anywhere on the page:
 *  - a stack beyond "web application + hosted Supabase database"
 *  - users, production usage, revenue, downloads or any metric
 *  - a reason for the pause (none is documented)
 *  - any public URL (the repository and the hosted app are not public, so
 *    every action uses the pending-link convention)
 */

import type {
  ArchitectureGroup,
  FlowStep,
  ProjectAction,
} from './castlearq';

export interface Decision {
  /** The decision itself, stated as a heading. */
  title: string;
  /** What the project actually did. */
  body: string;
  /** The engineering reason behind it. */
  why: string;
  /** What it made possible (or cost). */
  consequence: string;
}

export interface StateGroup {
  /** e.g. "Built", "Paused", "Not published". */
  label: string;
  items: { name: string; description: string }[];
}

export interface ProdLocalesContent {
  route: string;
  name: string;
  summary: string;
  /** The visible project status, e.g. "Paused". */
  status: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  tags: string[];
  seo: { title: string; description: string };
  actions: ProjectAction[];
  pendingNote: string;
  statusSection: {
    heading: string;
    statement: string;
    body: string;
  };
  problem: {
    heading: string;
    statement: string;
    body: string[];
    closing: string;
  };
  idea: {
    heading: string;
    body: string[];
    flow: FlowStep[];
    note: string;
  };
  howItWorks: {
    heading: string;
    lead: string;
    stages: FlowStep[];
    note: string;
  };
  architecture: {
    heading: string;
    lead: string;
    groups: ArchitectureGroup[];
    caption: string;
  };
  decisions: {
    heading: string;
    lead: string;
    items: Decision[];
  };
  dataFlow: {
    heading: string;
    lead: string;
    chain: FlowStep[];
    chainCaption: string;
    note: string;
  };
  currentState: {
    heading: string;
    lead: string;
    groups: StateGroup[];
    note: string;
  };
  learned: {
    heading: string;
    statement: string;
    body: string;
    areas: string[];
    quote: string;
  };
  closing: {
    heading: string;
    body: string;
    backHref: string;
    backLabel: string;
  };
}

export const prodLocales: ProdLocalesContent = {
  route: '/projects/prodlocales',
  name: 'ProdLocales',
  summary: 'Local product pricing and analytics',
  status: 'Paused',
  eyebrow: 'Case study',
  tagline: 'A product experiment about local prices, built end to end.',
  intro:
    'A web application built to explore how local product pricing could be collected, organised and analysed. The experiment was built and worked; development is currently paused.',
  tags: ['Product experiment', 'Web application', 'Supabase'],
  seo: {
    title: 'ProdLocales — Product Experiment (Paused)',
    description:
      'ProdLocales was a product experiment exploring local product pricing and analytics, built as a web application on Supabase. Development is currently paused.',
  },
  // TODO: replace `null` with the repository and application URLs if the
  // project is ever published. Nothing is linked until then.
  actions: [
    { label: 'Source code', href: null },
    { label: 'Application', href: null },
  ],
  pendingNote: 'The repository and the hosted application are not public.',

  statusSection: {
    heading: 'Status',
    statement: 'Development is currently paused.',
    body: 'ProdLocales was built as a working experiment, not a spec. It is not being developed at the moment, and the hosted database behind it pauses automatically after a period of inactivity — platform behaviour, not a failure of the project. No reason for the pause is documented, so none is invented: development is currently paused.',
  },

  problem: {
    heading: 'The problem',
    statement: 'Prices exist everywhere; understanding them locally is the hard part.',
    body: [
      'ProdLocales started from a question about local commerce: what does something actually cost around here, and how does that change over time? Price information for everyday products exists in fragments — on shelves, in flyers, in shops\u2019 own channels — and there is rarely a single place where it can be compared or analysed.',
      'The product was designed for that gap: take information about products and their local prices, organise it, and turn it into analysis a person could act on.',
      'This is the problem the experiment was designed around. ProdLocales never reached real users, so there is no market validation to report — and this page does not claim any.',
    ],
    closing:
      'That was the question the experiment set out to explore, and the point at which it stopped when development was paused.',
  },

  idea: {
    heading: 'A product, not a spreadsheet.',
    body: [
      'The idea was to turn scattered price information into a product: structured product data, organised locally, analysed over time, and presented as information someone could act on.',
      'ProdLocales was built as a web application with its own data layer, so the workflow could exist as software rather than as a manual process.',
    ],
    flow: [
      { title: 'Product information' },
      { title: 'Local pricing data' },
      { title: 'Analysis' },
      { title: 'Insights' },
      { title: 'Decision' },
    ],
    note: 'This page documents the project at the level of its design. The source has not been published, so finer implementation detail is deliberately not described.',
  },

  howItWorks: {
    heading: 'How it worked',
    lead: 'A user entered information; the product returned organised, analysed pricing data.',
    stages: [
      {
        title: 'User',
        description: 'Interacted with the product through the web interface.',
      },
      {
        title: 'Input',
        description:
          'Products and their local pricing information were registered in the application.',
      },
      {
        title: 'Storage',
        description:
          'The data lived in the hosted Supabase database the application was built on.',
      },
      {
        title: 'Processing',
        description:
          'The application organised the stored information so it could be compared and analysed.',
      },
      {
        title: 'Result',
        description:
          'The user saw pricing information presented as analysis rather than as a raw list.',
      },
    ],
    note: 'The stages describe the product at the level of its design. Because the source is unpublished, this page does not go deeper than what is documented.',
  },

  architecture: {
    heading: 'Architecture',
    lead: 'The system as it was designed: a web application on a hosted database.',
    groups: [
      { label: 'Client', nodes: ['User', 'Web interface'] },
      {
        label: 'ProdLocales application',
        core: true,
        nodes: ['Product data', 'Pricing records', 'Analysis', 'Presentation'],
      },
      { label: 'Hosted data (external)', external: true, nodes: ['Supabase database'] },
    ],
    caption:
      'ProdLocales was designed as a web application on top of a hosted Supabase database. The diagram describes how the system was built — it is not a statement about current operation. With the project paused, the hosted database pauses automatically after a period of inactivity; that is platform behaviour, not an infrastructure failure.',
  },

  decisions: {
    heading: 'Technical decisions',
    lead: 'Decisions that are documented at the level of the project\u2019s design.',
    items: [
      {
        title: 'A managed data layer from day one',
        body: 'The application was built directly on a hosted Supabase database instead of a self-managed backend service.',
        why: 'For a one-person experiment, managed hosting removed an entire category of infrastructure work that produced no learning on its own.',
        consequence:
          'The product could be built end to end quickly — and the same managed hosting pauses automatically when the project is inactive, which is exactly what happened.',
      },
      {
        title: 'Product thinking before tooling',
        body: 'The starting point was who would use the product and what information they needed, not a framework.',
        why: 'The experiment existed to explore a real question about local pricing, and every technical choice was in service of that question.',
        consequence:
          'The project stayed small and oriented around the data it existed to organise — and its limits were discovered earlier than they would have been behind more infrastructure.',
      },
      {
        title: 'Structure over raw data',
        body: 'Products and prices were modelled as structured records so analysis was possible at all.',
        why: 'Comparing and analysing prices requires data with shape, not a list of unstructured entries.',
        consequence:
          'The application could organise and present pricing information as analysis rather than as storage, which was the core of the product idea.',
      },
    ],
  },

  dataFlow: {
    heading: 'From data to information',
    lead: 'What the product did with the information a user entered.',
    chain: [
      { title: 'Data', description: 'Products and their local prices, as entered.' },
      { title: 'Organisation', description: 'Records given structure in the data layer.' },
      { title: 'Analysis', description: 'Information prepared for comparison over time.' },
      { title: 'Presentation', description: 'Analysis shown in the interface.' },
      { title: 'Decision', description: 'What the user was meant to take away.' },
    ],
    chainCaption: 'The application sat between raw entries and the analysis the user saw.',
    note: 'The product\u2019s value was intended to be this transformation. The page documents it at design level because the source has not been published.',
  },

  currentState: {
    heading: 'Current state',
    lead: 'What exists, what is paused, and what is simply not public.',
    groups: [
      {
        label: 'Built',
        items: [
          {
            name: 'A complete product experiment',
            description:
              'A web application with its own data layer, built end to end around local product pricing.',
          },
          {
            name: 'Product and pricing data model',
            description: 'Products and their local prices modelled as structured records.',
          },
          {
            name: 'Analysis and presentation',
            description: 'Stored information organised and shown in the interface as analysis.',
          },
          {
            name: 'Design-level documentation',
            description:
              'The problem, idea and architecture described here, at the level of the project\u2019s design.',
          },
        ],
      },
      {
        label: 'Paused',
        items: [
          {
            name: 'Development',
            description:
              'Development is currently paused. The project is not declared abandoned or failed — it is stopped, and that is the whole statement.',
          },
          {
            name: 'Hosted database',
            description:
              'The hosted Supabase database pauses automatically after a period of inactivity. This is platform behaviour, not a product or infrastructure failure.',
          },
        ],
      },
      {
        label: 'Not published',
        items: [
          {
            name: 'Repository and source',
            description:
              'The source has not been published, so this page describes the project at design level and makes no deeper implementation claims.',
          },
          {
            name: 'Hosted application',
            description:
              'The application is not publicly reachable, so there is no live link to it here.',
          },
          {
            name: 'Roadmap',
            description:
              'No future plan is documented for the project, so none is presented. Any future step would start from resuming development.',
          },
        ],
      },
    ],
    note: 'ProdLocales was built as a working experiment. Paused is not failed, and unpublished is not vanished: the project and its code remain, simply not public.',
  },

  learned: {
    heading: 'What building it taught me',
    statement:
      'Building ProdLocales taught me that a product and a feature are not the same size of problem.',
    body:
      'The technical work — a web application with a real data layer — turned out to be the smaller half. The larger half was product thinking: deciding what information mattered, what the user needed to see, and what the product was for. It also taught the discipline of stopping: recognising when an experiment has taught what it had to teach, and pausing it deliberately instead of letting it drift.',
    areas: [
      'product thinking',
      'real-world problem modelling',
      'data modelling',
      'web application architecture',
      'frontend and data-layer integration',
      'product requirements',
      'scoping an experiment',
      'deciding to pause',
    ],
    quote:
      'A finished experiment that teaches its lesson is not a failure — it is evidence.',
  },

  closing: {
    heading: 'A project can be paused and still be valuable.',
    body:
      'ProdLocales was built, it worked, and it taught what it had to teach. Development is currently paused; what remains is a completed product experiment and what it proved.',
    backHref: '/#work',
    backLabel: 'Back to selected work',
  },
};
