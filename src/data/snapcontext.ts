/**
 * SnapContext case-study content.
 *
 * Single source of truth for the /projects/snapcontext page, following the same
 * pattern as the CastleArq module: the homepage "Selected Work" preview reads
 * the route and summary from here, so the project is never described twice.
 *
 * Sources for every claim: the SnapContext repository (README, release notes,
 * vscode/ and jetbrains/ extension sources, snapcontext.py pipeline). Nothing
 * is claimed that is not visible in that material:
 *  - no user counts, downloads or productivity claims
 *  - marketplace listing URLs are `null` until they are public
 *  - experimental areas (XPU, multi-repo Graph RAG) are marked as such
 *
 * Shared generic types (flows, actions, diagram groups, capability labels) are
 * imported from the CastleArq content module so the case-study vocabulary stays
 * identical across projects without duplicating the definitions.
 */

import type {
  ArchitectureGroup,
  Capability,
  FlowStep,
  ProjectAction,
  SplitPair,
} from './castlearq';
import type { ProjectEntity } from './site';

export interface Decision {
  /** The decision itself, stated as a heading. */
  title: string;
  /** What the project actually does. */
  body: string;
  /** The engineering reason behind it. */
  why: string;
  /** What it makes possible (or costs). */
  consequence: string;
}

export interface SnapContextContent {
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
  aiContext: {
    heading: string;
    lead: string;
    chain: FlowStep[];
    chainCaption: string;
    pairs: SplitPair[];
    note: string;
  };
  ecosystem: {
    heading: string;
    lead: string;
    body: string[];
    surfaces: string[];
    actions: ProjectAction[];
    pendingNote: string;
    note: string;
  };
  currentState: {
    heading: string;
    lead: string;
    capabilities: Capability[];
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
 * the description and the public URLs are each written once.
 */
const projectName = 'SnapContext';
const seoDescription =
  'SnapContext is an open-source AI coding assistant that detects the project, selects relevant files and prepares context for AI-assisted development workflows.';
const repositoryUrl = 'https://github.com/NicolasBruna24/snapcontext';
const packageUrl = 'https://pypi.org/project/snapcontext/';
/**
 * Published project site / documentation page, declared as the project's own
 * website by the repository, so the case study links the same public resources
 * the project itself publishes.
 */
const docsUrl = 'https://nicolasbruna24.github.io/snapcontext/';

export const snapContext: SnapContextContent = {
  route: '/projects/snapcontext',
  name: projectName,
  summary: 'AI context management for developers',
  eyebrow: 'Case study',
  tagline: 'Relevant project context, prepared automatically.',
  intro:
    'An open-source AI coding assistant that detects the project, selects the relevant files and prepares the context an AI workflow needs — with cloud providers or fully local models.',
  tags: ['Open Source', 'Python', 'AI', 'CLI + IDEs'],
  seo: {
    title: 'SnapContext — AI Context Management for Developers',
    description: seoDescription,
  },
  actions: [
    { label: 'View on GitHub', href: repositoryUrl },
    { label: 'Documentation', href: docsUrl },
    { label: 'Install from PyPI', href: packageUrl },
  ],
  entity: {
    type: 'SoftwareApplication',
    name: projectName,
    description: seoDescription,
    codeRepository: repositoryUrl,
    installUrl: packageUrl,
  },

  problem: {
    heading: 'The problem',
    statement: 'An AI assistant can only work with the context it is given.',
    body: [
      'When I used AI coding assistants on real projects, the bottleneck was rarely the model. It was the context: which files the assistant could see. Hand the model the whole repository and small local models choke on files that do not fit the window; hand it nothing and it guesses.',
      'Curating that list by hand does not scale. Attaching files manually before every request — the way Aider\u2019s /add works — turns each task into a preparation ritual: remember the files, keep the list current, trim it again when the window overflows.',
      'It gets worse with local models. A model running on your own machine often has a context window of a few thousand tokens, so sending whole files fails constantly — precisely the setup where automatic help is worth the most.',
    ],
    closing:
      'SnapContext was created to remove that preparation work: detect the project, find the relevant files and fit them into the context the model actually receives.',
  },

  idea: {
    heading: 'One command from project to prepared context.',
    body: [
      'SnapContext looks at the project the way a developer would: what stack is this, which files could matter for this request, what should the model actually see. The user starts from a task — describe a bug, request a change — and the context is built around it.',
      'The goal is not to hide the model but to make the hand-off precise: relevant files and blocks instead of an unfiltered dump of the repository.',
    ],
    flow: [
      { title: 'Project' },
      { title: 'Stack detection' },
      { title: 'Candidate scan' },
      { title: 'AI selection' },
      { title: 'Prepared context' },
    ],
    note: 'SnapContext is not a model. It prepares and manages context, then hands the work to a provider the user chooses — a cloud API or a local model through Ollama.',
  },


  howItWorks: {
    heading: 'How it works',
    lead: 'One request, one pipeline. Each stage exists because the next one needs it.',
    stages: [
      { title: 'Developer', description: 'Describes a task or asks a question.' },
      {
        title: 'Project',
        description:
          'The working directory is validated as a project root and the stack is detected from marker files: pubspec.yaml, package.json, pyproject.toml, go.mod, Cargo.toml.',
      },
      {
        title: 'Scan',
        description:
          'Candidate files are listed — git ls-files when available, otherwise a directory walk — and ranked locally against the request before any model is involved.',
      },
      {
        title: 'Select',
        description:
          'The configured AI provider chooses the most relevant files among the top-ranked candidates. A local heuristic mode covers requests without an API key.',
      },
      {
        title: 'Shape',
        description:
          'Tokens are estimated, oversized files are reduced to their relevant blocks, and verbose tool output is pruned so the prompt fits the model\u2019s window.',
      },
      {
        title: 'Execute',
        description:
          'The ReAct agent works with that context: answering, planning, editing through the built-in editor or Aider, and running the project\u2019s tests in a loop.',
      },
    ],
    note: 'The same pipeline sits behind every interface: the CLI, the IDE extensions, the web UI and the messenger gateways.',
  },

  architecture: {
    heading: 'Architecture',
    lead: 'SnapContext sits between the development environment and the AI providers.',
    groups: [
      { label: 'Entry points', nodes: ['CLI', 'IDE extensions', 'Web / TUI / API'] },
      {
        label: 'SnapContext core',
        core: true,
        nodes: [
          'Project detection',
          'Context pipeline',
          'ReAct agent + planner',
          'Memory + history',
          'Permissions + sandbox',
        ],
      },
      {
        label: 'AI providers (external)',
        external: true,
        nodes: ['Gemini', 'Claude', 'Ollama', 'DeepSeek', 'Groq'],
      },
      { label: 'Execution', nodes: ['Built-in editor / Aider', 'Test loop', 'Git'] },
    ],
    caption:
      'SnapContext is a layer between the developer\u2019s environment and the AI providers. It understands the project, prepares the context, enforces permissions and memory, and delegates generation and execution to the selected provider and editor.',
  },

  decisions: {
    heading: 'Technical decisions',
    lead: 'Decisions that are visible in the way the project behaves.',
    items: [
      {
        title: 'Context as an explicit pipeline',
        body: 'Detection, scanning, selection and shaping are separate stages instead of one opaque prompt builder.',
        why: 'A single prompt that dumps the repository breaks as soon as one file exceeds the window.',
        consequence:
          'Each stage can degrade independently: without git it walks directories, without tree-sitter it falls back to regex, without an API key it selects with local heuristics.',
      },
      {
        title: 'Heuristics before the model',
        body: 'Files are ranked locally against the request first; only the best candidates reach the selection prompt.',
        why: 'The model\u2019s job is choosing among plausible files, not reading the whole tree.',
        consequence:
          'Selection stays cheap and deterministic, works with local models and without API keys, and its cost does not grow with the size of the repository.',
      },
      {
        title: 'Token-budget context',
        body: 'Every file is measured before it is sent. Oversized files are reduced to their relevant blocks — extracted with tree-sitter when the language is supported — and verbose tool output is pruned to summaries.',
        why: 'Local models often have windows of a few thousand tokens; whole files simply do not fit.',
        consequence:
          'Large codebases remain usable on small local models, and context-overflow errors from providers are detected and handled instead of crashing the run.',
      },
      {
        title: 'An editor of its own, with backups',
        body: 'SnapContext ships a built-in editor — validated writes inside the project, automatic backups — and keeps Aider as an optional alternative.',
        why: 'Depending on an external tool for every edit made the base workflow fragile.',
        consequence:
          'Plans can commit step by step and changes can be undone per step with snapcontext revert.',
      },
      {
        title: 'Autonomy behind permissions',
        body: 'Approved actions persist in a permissions file, risky commands run in a Docker sandbox by default, and background processes without it are rejected.',
        why: 'An agent that edits and executes code needs boundaries the user controls.',
        consequence:
          'Autonomous mode reuses the decisions the user already approved instead of asking again for each step.',
      },
    ],
  },

  aiContext: {
    heading: 'What \u201ccontext\u201d means here',
    lead: 'Four different things are called context in an AI workflow. SnapContext treats them as distinct stages.',
    chain: [
      { title: 'Source code', description: 'Everything in the repository.' },
      {
        title: 'Candidate files',
        description: 'The subset the scanner considers relevant to the request.',
      },
      {
        title: 'Selected files',
        description: 'The files the provider chooses for this task.',
      },
      {
        title: 'Relevant blocks',
        description: 'Inside oversized files, the functions and classes that matter.',
      },
      {
        title: 'Model input',
        description: 'The shaped prompt that actually reaches the model.',
      },
    ],
    chainCaption: 'Only the last stage is visible to the provider.',
    pairs: [
      {
        label: 'What SnapContext is',
        description:
          'A context layer and an orchestrator: it prepares what the model sees, calls the provider, applies edits through its editor and keeps the memory of the project.',
      },
      {
        label: 'What it is not',
        description:
          'It is not a model. Code is generated by the connected provider — Gemini, Claude, a local model through Ollama, or another OpenAI-compatible API.',
      },
    ],
    note: 'Provider profiles adapt the prompt per model: cloud models receive fuller instructions, while local models get reduced context to stay inside smaller windows.',
  },

  ecosystem: {
    heading: 'Where it runs',
    lead: 'One core, several surfaces. All of them drive the same pipeline.',
    body: [
      'The CLI is the primary surface: snapcontext, snapcontext --chat, --plan, --tui. The installation is pipx or pip, the --init wizard configures the provider, and --demo runs without an API key.',
      'The VS Code extension embeds the web chat in a webview, streams the orchestrator logs to an output channel, and adds an \u201cAdd to context\u201d action in the explorer — the visual equivalent of /add.',
      'The JetBrains plugin brings the same actions into IntelliJ IDEA and PyCharm: a Tools menu, a bottom tool window with live output, a settings page, and files added to the context from the project view. It expects the snapcontext CLI to be installed.',
    ],
    surfaces: [
      'CLI',
      'VS Code',
      'JetBrains IDEs',
      'Web UI',
      'TUI',
      'REST API',
      'Discord',
      'Telegram',
    ],
    actions: [
      { label: 'GitHub', href: repositoryUrl },
      { label: 'PyPI', href: packageUrl },
      // TODO: link the marketplace listings once they are public. The
      // extensions exist in the repository (vscode/, jetbrains/) but no
      // published listing URL could be verified, so none is invented.
      { label: 'VS Code Marketplace', href: null },
      { label: 'JetBrains Marketplace', href: null },
    ],
    pendingNote: 'The VS Code and JetBrains marketplace listings are not public yet.',
    note: 'Windows, Linux and macOS are supported. Installers exist for all three, including a Windows executable without Python.',
  },

  currentState: {
    heading: 'Where the project stands',
    lead:
      'SnapContext is published on PyPI and under active development. The labels below describe today, not the roadmap.',
    capabilities: [
      {
        name: 'Automatic project detection',
        description: 'Marker files and typical folders identify the stack before anything runs.',
        status: 'in-place',
      },
      {
        name: 'Repository scan and candidate ranking',
        description:
          'git-aware listing plus local scoring of files against the request, before any model is called.',
        status: 'in-place',
      },
      {
        name: 'AI file selection',
        description: 'Provider-backed selection among ranked candidates, with a heuristic local mode.',
        status: 'in-place',
      },
      {
        name: 'Token-aware shaping and pruning',
        description:
          'Relevant-block extraction for oversized files and proactive pruning of tool output.',
        status: 'in-place',
      },
      {
        name: 'ReAct agent and planner',
        description: 'Tool-driven reasoning loop, multi-step plans and an autonomous mode with retries.',
        status: 'in-place',
      },
      {
        name: 'Built-in editor and Aider support',
        description: 'Validated writes with automatic backups, step commits and per-step revert.',
        status: 'in-place',
      },
      {
        name: 'Permissions and Docker sandbox',
        description: 'Persistent approvals, default-deny sandboxing of risky commands, safe file writes.',
        status: 'in-place',
      },
      {
        name: 'Persistent memory',
        description: 'Project memory (CLAUDE.md), SQLite history and a proactive curation daemon.',
        status: 'in-place',
      },
      {
        name: 'MCP client and plugin marketplace',
        description: 'Built-in database, API and browser tools, plus third-party MCP servers.',
        status: 'in-place',
      },
      {
        name: 'Graph RAG and LSP analysis',
        description:
          'A code dependency graph and LSP-backed symbols, degrading to regex search when unavailable.',
        status: 'in-place',
      },
      {
        name: 'Interfaces and integrations',
        description:
          'CLI, TUI, web UI, REST API, VS Code and JetBrains extensions, Discord and Telegram.',
        status: 'in-place',
      },
      {
        name: 'Testing and benchmark',
        description:
          'A pytest suite with coverage gates, ruff and mypy, and a 50-task editing benchmark verified by AST.',
        status: 'in-place',
      },
      {
        name: 'Multi-repository Graph RAG',
        description: 'Cross-repository indexing is a stated direction, not a shipped capability.',
        status: 'in-development',
      },
      {
        name: 'Intel XPU acceleration',
        description:
          'Local inference on Intel Arc GPUs exists behind an extra; broader hardware support is experimental.',
        status: 'in-development',
      },
      {
        name: 'Monolith decomposition',
        description: 'The orchestrator and the messenger gateways are still being extracted into modules.',
        status: 'in-development',
      },
      {
        name: 'Editing benchmark, deep mode',
        description:
          'The full-agent benchmark with a local model is planned; the light engine benchmark is the one measured.',
        status: 'in-development',
      },
    ],
    note: 'The benchmark measures the editing engine on synthetic tasks with AST verification, not general coding quality, and says so in the repository.',
  },

  learned: {
    heading: 'What building it taught me',
    statement:
      'Building SnapContext taught me that context is an engineering problem before it is an AI problem.',
    body:
      'The original friction — attaching files to an assistant by hand — turned into work on project detection, repository scanning, token budgets, parser integration, safe file writes, sandboxing and permission systems. An assistant that edits code on its own is only trustworthy when everything around the model is explicit: what it may read, what it may run, and what happens when a component is missing.',
    areas: [
      'developer tooling',
      'IDE extension development',
      'repository analysis',
      'token budgets',
      'parser integration',
      'safe file writes',
      'sandboxing',
      'permission systems',
      'graceful degradation',
      'open-source maintenance',
    ],
    quote:
      'The hard part of an AI coding assistant is not the model — it is deciding what the model sees.',
  },

  closing: {
    heading: 'Built to remove friction from AI-assisted development.',
    body:
      'SnapContext started as a simple annoyance: preparing context by hand, file by file, before every request. The answer was a tool that reads the project the way a developer does — and hands the model only what matters.',
    backHref: '/#work',
    backLabel: 'Back to selected work',
  },
};
