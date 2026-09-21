/**
 * CastleArq case-study content.
 *
 * Single source of truth for the /projects/castlearq page: the route, the copy,
 * the diagram data and the structured lists. The homepage "Selected Work"
 * preview reads the same route and summary from here, so the project is never
 * described in two places.
 *
 * Editorial rules for this content:
 *  - describe the current, verifiable scope; never present the roadmap as shipped
 *  - external links stay `null` until a real URL is public (no invented URLs)
 *  - no benchmarks, no performance numbers, no "automatically fixes your system"
 */

import type { ProjectEntity } from './site';

export interface ProjectAction {
  label: string;
  /** Public URL, or `null` while the link has not been published. */
  href: string | null;
}

/** One step of a flow or a chain. `description` is optional for label-only steps. */
export interface FlowStep {
  title: string;
  description?: string;
}

/** A two-part comparison rendered side by side (never colour-coded alone). */
export interface SplitPair {
  label: string;
  description: string;
}

export interface Decision {
  title: string;
  body: string;
  /** Optional diagram rendered underneath the decision. */
  figure?: DecisionFigure;
}

/** The small diagrams attached to individual technical decisions. */
export type DecisionFigure = 'pipeline' | 'runtime-tree' | 'compatibility';

export interface Criterion {
  name: string;
  description: string;
}

/** `in-place` = part of the project today, `in-development` = still growing. */
export type CapabilityStatus = 'in-place' | 'in-development';

export interface Capability {
  name: string;
  description: string;
  status: CapabilityStatus;
}

/** A labelled band of the architecture diagram. */
export interface ArchitectureGroup {
  label: string;
  /** True for the band that is CastleArq itself: drawn as the filled layer. */
  core?: boolean;
  /** True for groups that live outside CastleArq itself. */
  external?: boolean;
  nodes: string[];
}

export interface CastleArqContent {
  route: string;
  name: string;
  summary: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  tags: string[];
  seo: { title: string; description: string };
  actions: ProjectAction[];
  entity: ProjectEntity;
  problem: {
    heading: string;
    statement: string;
    body: string[];
    tools: string[];
    chain: FlowStep[];
    chainCaption: string;
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
    pipeline: string[];
    pipelineLabel: string;
    runtimeTree: { root: string; layer: string; runtimes: string[] };
    runtimeNote: string;
    compatibility: SplitPair[];
  };
  modelSelection: {
    heading: string;
    lead: string;
    criteria: Criterion[];
    criteriaNote: string;
    /** Short labels used by the suitability diagram. */
    inputs: { resources: string[]; characteristics: string[] };
    labels: { resources: string; characteristics: string; result: string };
    resultNote: string;
  };
  systemChanges: {
    heading: string;
    body: string;
    pairs: SplitPair[];
    note: string;
  };
  currentState: {
    heading: string;
    lead: string;
    capabilities: Capability[];
    note: string;
  };
  roadmap: {
    heading: string;
    lead: string;
    stages: string[];
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
/**
 * Values shared by the page copy and its structured data, so the project name,
 * the description and the repository URL are each written once.
 */
const projectName = 'CastleArq';
const seoDescription =
  'CastleArq is an open-source platform exploring a simpler way to configure and run local AI based on hardware, software and model requirements.';
const repositoryUrl = 'https://github.com/NicolasBruna24/castlearq';

export const castleArq: CastleArqContent = {
  route: '/projects/castlearq',
  name: projectName,
  summary: 'Local AI orchestration platform',
  eyebrow: 'Case study',
  tagline: 'Making local AI easier to configure and run.',
  intro:
    'An open-source platform designed to reduce the complexity of choosing, configuring and running local AI runtimes based on the user\'s hardware and environment.',
  tags: ['Open Source', 'Python', 'AI', 'Linux'],
  seo: {
    title: 'CastleArq — Local AI Orchestration Platform',
    description: seoDescription,
  },
  // Repository and documentation URLs are public.
  actions: [
    { label: 'View on GitHub', href: repositoryUrl },
    { label: 'Documentation', href: `${repositoryUrl}/blob/main/README.md` },
  ],
  entity: {
    type: 'SoftwareApplication',
    name: projectName,
    description: seoDescription,
    codeRepository: repositoryUrl,
  },

  problem: {
    heading: 'The problem',
    statement: 'Local AI shouldn\'t require becoming an infrastructure expert.',
    body: [
      'When I started running models on my own machine I found several tools with different approaches: Ollama, llama.cpp, LM Studio and vLLM. Knowing that they exist was never the difficulty.',
      'The difficulty was deciding. Which runtime fits this hardware? Which backend does it use here? Is the hardware actually capable of what I expect from it? Are the required components present, and compatible with what is already installed?',
      'The problem became more concrete in specific GPU environments. A capability the hardware reports does not always mean the installed runtime and backend support it, and the answer changes with drivers and versions.',
    ],
    tools: ['Ollama', 'llama.cpp', 'LM Studio', 'vLLM'],
    chain: [
      { title: 'User wants to run a model' },
      { title: 'Which runtime?' },
      { title: 'Which backend?' },
      { title: 'Does my hardware support it?' },
      { title: 'Are the required components available?' },
      { title: 'Which model fits my resources?' },
    ],
    chainCaption: 'The same questions, every time, before a single token is generated.',
    closing: 'CastleArq was created to reduce that decision complexity.',
  },

  idea: {
    heading: 'One place to understand your local AI environment.',
    body: [
      'CastleArq brings together the logic needed to analyse the environment and work out a configuration that fits it. The user starts from a goal — I want to run this model — and CastleArq uses what it knows about the environment and about the requirements of that model to guide the configuration.',
      'The intent is to make the environment legible: what is present, what is missing, what is compatible, and where the trade-offs are.',
    ],
    flow: [
      { title: 'Hardware + Software' },
      { title: 'Compatibility analysis' },
      { title: 'Configuration recommendation' },
      { title: 'Preflight' },
      { title: 'Execution' },
    ],
    note: 'CastleArq sits above the individual AI runtimes. It is a layer that decides and validates, not another runtime competing with the ones already installed.',
  },

  howItWorks: {
    heading: 'How it works',
    lead:
      'A request moves through a fixed sequence. Each stage has one responsibility and can fail early, saying why.',
    stages: [
      { title: 'User' },
      { title: 'CLI / API', description: 'Receives the request.' },
      { title: 'Use Cases', description: 'Coordinates the requested operation.' },
      {
        title: 'Resolver',
        description:
          'Determines the appropriate runtime, backend and configuration based on the available information.',
      },
      {
        title: 'Preflight',
        description:
          'Performs checks before execution to identify missing or incompatible components.',
      },
      {
        title: 'Runtime Backend',
        description: 'Provides an abstraction between CastleArq and the concrete AI runtimes.',
      },
      {
        title: 'llama.cpp / Ollama',
        description: 'Concrete runtime implementations used to execute models.',
      },
      { title: 'Model', description: 'The model selected by the resolved configuration.' },
      { title: 'Inference', description: 'The selected model is finally executed.' },
    ],
    note: 'llama.cpp and Ollama are the concrete runtimes in use today. The runtime backend exists so that the layers above do not depend on either of them.',
  },

  architecture: {
    heading: 'Architecture',
    lead: 'The same sequence, grouped by responsibility.',
    groups: [
      { label: 'Entry point', nodes: ['User', 'CLI / API'] },
      {
        label: 'CastleArq core',
        core: true,
        nodes: ['Use Cases', 'Resolver', 'Preflight', 'Runtime Backend'],
      },
      { label: 'Runtimes (external)', external: true, nodes: ['llama.cpp', 'Ollama'] },
      { label: 'Execution', nodes: ['Model', 'Inference'] },
    ],
    caption:
      'CastleArq is designed as a layer above individual AI runtimes. Its responsibility is to understand the environment, evaluate options, resolve a configuration, validate it and then delegate execution to the selected runtime.',
  },
  decisions: {
    heading: 'Technical decisions',
    lead: 'Four decisions shape the way the project is put together.',
    items: [
      {
        title: 'Separation of concerns',
        body: 'Detection, resolution, validation and execution have separate responsibilities. Each stage can be reasoned about, tested and replaced on its own, which keeps the failure surface small.',
        figure: 'pipeline',
      },
      {
        title: 'Runtime abstraction',
        body: 'CastleArq should not be tightly coupled to one specific runtime. The runtime backend defines what the layers above are allowed to assume, so another runtime is an implementation of that boundary rather than a change spread across the whole codebase.',
        figure: 'runtime-tree',
      },
      {
        title: 'Explicit compatibility',
        body: 'Hardware capability and runtime support are treated as two different questions. What the machine can expose is not the same as what a specific runtime and backend implement in the version that is installed, so both are checked separately.',
        figure: 'compatibility',
      },
      {
        title: 'Preflight',
        body: 'Relevant requirements are validated before execution is attempted. The purpose is to identify potential problems earlier and communicate them to the user, instead of failing part-way through a run.',
      },
    ],
    pipeline: ['detection', 'resolution', 'validation', 'execution'],
    pipelineLabel: 'One responsibility per stage',
    runtimeTree: {
      root: 'CastleArq',
      layer: 'Runtime Backend',
      runtimes: ['llama.cpp', 'Ollama'],
    },
    runtimeNote:
      'These are the runtimes in use today. The abstraction is what allows others to be added without touching the layers above it.',
    compatibility: [
      {
        label: 'Hardware capability',
        description: 'What the machine reports: accelerator, model, memory, driver version.',
      },
      {
        label: 'Runtime / backend support',
        description: 'What the installed runtime and backend actually implement.',
      },
    ],
  },

  modelSelection: {
    heading: 'Model selection',
    lead: 'Which model makes sense is a question about the machine as much as about the model.',
    criteria: [
      {
        name: 'VRAM available',
        description:
          'How much the GPU can hold at once. It is usually the limiting factor for keeping a model resident.',
      },
      {
        name: 'RAM',
        description:
          'System memory matters when part of the model runs on the CPU instead of the GPU.',
      },
      {
        name: 'Model size',
        description: 'Parameter count, and with it the amount of memory the weights require.',
      },
      {
        name: 'Quantization',
        description: 'How the weights are compressed: a trade between memory footprint and precision.',
      },
      {
        name: 'Model architecture',
        description:
          'Memory requirements differ between architectures, and not every runtime supports every one.',
      },
    ],
    criteriaNote: 'These are the criteria currently considered.',
    inputs: {
      resources: ['VRAM', 'RAM'],
      characteristics: ['Size', 'Quantization', 'Architecture'],
    },
    labels: {
      resources: 'System resources',
      characteristics: 'Model characteristics',
      result: 'Model compatibility / suitability',
    },
    resultNote:
      'This is a suitability estimate for a given configuration, not a performance prediction. CastleArq does not claim to know how fast a model will run on a particular machine, only whether the configuration is plausible for the resources available.',
  },

  systemChanges: {
    heading: 'Compatibility and system changes',
    body: 'When CastleArq identifies a missing or incompatible component, it can indicate that a system update or a configuration change may enable the requested setup.',
    pairs: [
      {
        label: 'What CastleArq can do',
        description:
          'Identify the missing or incompatible components, explain what is blocking the configuration, and indicate when an update or a change to the environment may make it possible.',
      },
      {
        label: 'What stays with you',
        description:
          'The decision and the change itself. CastleArq does not modify your system, install drivers or alter your environment on its own.',
      },
    ],
    note: 'Detecting a possible fix is not the same as applying it, and the project is explicit about the difference.',
  },
  currentState: {
    heading: 'Where the project stands',
    lead:
      'CastleArq is under active development. These are the areas it is built around today; the roadmap further down is deliberately outside the current scope.',
    capabilities: [
      {
        name: 'Environment detection',
        description:
          'Understands the hardware and software situation of the machine: accelerator, memory, drivers and installed components.',
        status: 'in-place',
      },
      {
        name: 'Compatibility analysis',
        description: 'Evaluates the environment against what a given configuration requires.',
        status: 'in-place',
      },
      {
        name: 'Configuration resolution',
        description: 'Works out which runtime, backend and settings a request resolves to.',
        status: 'in-place',
      },
      {
        name: 'Preflight checks',
        description: 'Validates requirements before execution and reports what is missing.',
        status: 'in-place',
      },
      {
        name: 'Runtime abstraction',
        description: 'A single boundary in front of the concrete runtimes.',
        status: 'in-place',
      },
      {
        name: 'Local model execution',
        description: 'Runs the selected model through llama.cpp or Ollama.',
        status: 'in-place',
      },
      {
        name: 'CLI / API',
        description: 'The entry points a request can come through.',
        status: 'in-place',
      },
      {
        name: 'Structured compatibility knowledge',
        description:
          'The knowledge the compatibility decisions are drawn from, and the part of the project that keeps growing with each environment it meets.',
        status: 'in-development',
      },
    ],
    note:
      'Status labels describe the project as it stands today. They are not a claim that the long-term vision below is finished.',
  },

  roadmap: {
    heading: 'Where it is going',
    lead:
      'The long-term direction is a full path from a model to a conversation, not only the execution step CastleArq covers today.',
    stages: [
      'Model',
      'Download',
      'Artifact',
      'Dataset',
      'Training job',
      'Evaluation',
      'Adapter',
      'Version',
      'Deployment',
      'Inference',
      'Chat',
    ],
    note:
      'This is direction, not a feature list. None of the stages above is presented as available today; they are listed because they shape how the current architecture is being put together.',
  },

  learned: {
    heading: 'What building it changed',
    statement: 'Building CastleArq changed the way I think about software architecture.',
    body:
      'It started as a question about local AI and turned into work on hardware detection, software compatibility, runtime abstraction, configuration resolution and preflight validation. A large part of the effort went into being explicit about uncertainty: knowing what the system can determine, what it has to ask about, and what it cannot guarantee. That distinction is what makes the rest of the design possible.',
    areas: [
      'hardware detection',
      'software compatibility',
      'runtime abstraction',
      'configuration resolution',
      'preflight validation',
      'explicit uncertainty',
      'testing',
      'modular architecture',
    ],
    quote:
      'Simplifying a complex system often requires understanding the complexity underneath it first.',
  },

  closing: {
    heading: 'Built from a real problem.',
    body: 'CastleArq started with a simple question: Why does running local AI have to be this complicated?',
    backHref: '/#work',
    backLabel: 'Back to selected work',
  },
};