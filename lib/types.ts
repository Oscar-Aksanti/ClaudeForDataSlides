/**
 * Schémas de contenu — brief section 6 & 7.
 * Chaque slide est typée par discrimination sur `type`, qui pointe vers un composant
 * unique dans slide-registry.tsx. Ajouter une slide = ajouter une entrée JSON, jamais
 * de code.
 */

export interface SlideBase {
  id: string;
  /** Notes de script pour le mode présentateur — jamais affichées à l'écran public. */
  presenterNotes?: string;
}

export interface CoverSlide extends SlideBase {
  type: "cover";
  eyebrow: string;
  title: string[];
  /** Sous-chaîne de `title` à colorer en signal-bright (doit apparaître telle quelle). */
  highlight?: string;
  subtitle?: string;
  meta?: string;
  metaHighlight?: string;
}

export interface SpeakerIntroSlide extends SlideBase {
  type: "speaker-intro";
  eyebrow: string;
  name: string;
  bio: string;
  stats: { value: string; label: string }[];
  photoPlaceholder: string;
  /** Chemin vers une vraie photo dans /public — si absent, affiche photoPlaceholder à la place. */
  photo?: string;
}

export interface DayMapSlide extends SlideBase {
  type: "day-map";
  eyebrow: string;
  title: string;
  activeDay: number;
  days: { num: string; title: string; subtitle: string }[];
}

export interface PrincipleListSlide extends SlideBase {
  type: "principle-list";
  eyebrow: string;
  title: string;
  lead?: string;
  items: { num: string; title: string; detail: string }[];
}

export interface ComparisonSlide extends SlideBase {
  type: "comparison";
  eyebrow: string;
  title: string;
  columns: [ComparisonColumn, ComparisonColumn];
}

export interface ComparisonColumn {
  label: string;
  items: string[];
  winner?: boolean;
}

export interface EcosystemGridSlide extends SlideBase {
  type: "ecosystem-grid";
  eyebrow: string;
  title: string;
  items: { icon: string; title: string; detail: string }[];
}

export interface DecisionTableSlide extends SlideBase {
  type: "decision-table";
  eyebrow: string;
  title: string;
  lead?: string;
  rows: { want: string; tool: string }[];
}

export interface WorkflowFlowSlide extends SlideBase {
  type: "workflow-flow";
  eyebrow: string;
  title: string;
  nodes: { icon: string; label: string; detail: string; highlight?: boolean }[];
}

export interface BeforeAfterSlide extends SlideBase {
  type: "before-after";
  eyebrow: string;
  title: string;
  before: { label: string; rows: string[] };
  after: { label: string; rows: { primary: string; secondary: string }[] };
}

export interface DataTableSlide extends SlideBase {
  type: "data-table";
  eyebrow: string;
  title: string;
  lead?: string;
  columns: string[];
  rows: { cells: string[]; critical?: boolean }[];
}

export interface CodeCardSlide extends SlideBase {
  type: "code-card";
  eyebrow: string;
  title: string;
  filename: string;
  /** Texte du prompt/code. Supporte des marqueurs légers <k>…</k> et <v>…</v> pour la coloration. */
  code: string;
  /** Si présent, affiche une zone de preview en pointillés sous le code (repère pour démo écran live). */
  previewLabel?: string;
}

export interface AgentBoxesSlide extends SlideBase {
  type: "agent-boxes";
  eyebrow: string;
  title: string;
  boxes: { badge: string; title: string; detail: string; highlight?: boolean }[];
}

export interface StepListSlide extends SlideBase {
  type: "step-list";
  eyebrow: string;
  title: string;
  steps: { title: string; detail: string }[];
}

export interface DeliverableChecklistSlide extends SlideBase {
  type: "deliverable-checklist";
  eyebrow: string;
  title: string;
  items: { title: string; detail: string }[];
}

export interface QuoteStatSlide extends SlideBase {
  type: "quote-stat";
  eyebrow: string;
  value: number;
  suffix?: string;
  label: string;
  context?: string;
}

export type Slide =
  | CoverSlide
  | SpeakerIntroSlide
  | DayMapSlide
  | PrincipleListSlide
  | ComparisonSlide
  | EcosystemGridSlide
  | DecisionTableSlide
  | WorkflowFlowSlide
  | BeforeAfterSlide
  | DataTableSlide
  | CodeCardSlide
  | AgentBoxesSlide
  | StepListSlide
  | DeliverableChecklistSlide
  | QuoteStatSlide;

export type SlideType = Slide["type"];

export interface DayChapter {
  title: string;
  /** Durée estimée en minutes — repère pour le formateur, pas une contrainte stricte. */
  minutes: number;
  /** Id de la première slide du chapitre, pour calculer sa plage et lier le CTA "Commencer ici". */
  firstSlideId: string;
}

export interface DayContent {
  day: number;
  title: string;
  date: string;
  /** Résumé des objectifs du jour, affiché sur la page sommaire avant d'entrer dans le deck. */
  objective?: string;
  /** Liste courte des livrables attendus — miroir de la slide deliverable-checklist, pour affichage hors-deck. */
  deliverables?: string[];
  /** Groupement des slides en chapitres, pour la page sommaire /jour/[day]. */
  chapters?: DayChapter[];
  slides: Slide[];
}

export interface DayMetaEntry {
  day: number;
  title: string;
  subtitle: string;
  date: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  url: string;
  category: string;
  license: string;
  day?: number;
}
