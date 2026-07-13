import {
  Database,
  Sparkles,
  Clock,
  BarChart3,
  CheckCircle2,
  MessageSquare,
  Code2,
  CircleDot,
  Table2,
  LayoutTemplate,
  Layers,
  Star,
  Webhook,
  Target,
  ArrowRight,
  Wand2,
  ShieldCheck,
  Globe,
  Rocket,
  Bot,
  Plug,
  Search,
  Eraser,
  Table2 as Table2Icon,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  database: Database,
  clean: Sparkles,
  clock: Clock,
  "chart-bar": BarChart3,
  check: CheckCircle2,
  chat: MessageSquare,
  code: Code2,
  cowork: CircleDot,
  apps: Table2,
  artifacts: LayoutTemplate,
  projects: Layers,
  skills: Star,
  api: Webhook,
  target: Target,
  decision: ArrowRight,
  magic: Wand2,
  shield: ShieldCheck,
  globe: Globe,
  rocket: Rocket,
  agent: Bot,
  mcp: Plug,
  search: Search,
  wipe: Eraser,
  table: Table2Icon,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

/** Résout un nom d'icône (défini dans le JSON de contenu) vers un composant lucide-react. */
export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = REGISTRY[name] ?? CircleDot;
  return <Icon className={className} strokeWidth={1.6} />;
}
