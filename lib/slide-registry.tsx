import type { ComponentType } from "react";
import type { Slide, SlideType } from "@/lib/types";
import { CoverSlide } from "@/components/slides/CoverSlide";
import { SpeakerIntroSlide } from "@/components/slides/SpeakerIntroSlide";
import { DayMapSlide } from "@/components/slides/DayMapSlide";
import { PrincipleListSlide } from "@/components/slides/PrincipleListSlide";
import { ComparisonSlide } from "@/components/slides/ComparisonSlide";
import { EcosystemGridSlide } from "@/components/slides/EcosystemGridSlide";
import { DecisionTableSlide } from "@/components/slides/DecisionTableSlide";
import { WorkflowFlowSlide } from "@/components/slides/WorkflowFlowSlide";
import { BeforeAfterSlide } from "@/components/slides/BeforeAfterSlide";
import { DataTableSlide } from "@/components/slides/DataTableSlide";
import { CodeCardSlide } from "@/components/slides/CodeCardSlide";
import { AgentBoxesSlide } from "@/components/slides/AgentBoxesSlide";
import { StepListSlide } from "@/components/slides/StepListSlide";
import { DeliverableChecklistSlide } from "@/components/slides/DeliverableChecklistSlide";
import { QuoteStatSlide } from "@/components/slides/QuoteStatSlide";

/**
 * Mapping type → composant. Ajouter un type de slide = ajouter une entrée ici
 * + le schéma dans lib/types.ts, jamais toucher aux routes ou au deck.
 */
export const SLIDE_REGISTRY: Record<SlideType, ComponentType<{ slide: never }>> = {
  cover: CoverSlide,
  "speaker-intro": SpeakerIntroSlide,
  "day-map": DayMapSlide,
  "principle-list": PrincipleListSlide,
  comparison: ComparisonSlide,
  "ecosystem-grid": EcosystemGridSlide,
  "decision-table": DecisionTableSlide,
  "workflow-flow": WorkflowFlowSlide,
  "before-after": BeforeAfterSlide,
  "data-table": DataTableSlide,
  "code-card": CodeCardSlide,
  "agent-boxes": AgentBoxesSlide,
  "step-list": StepListSlide,
  "deliverable-checklist": DeliverableChecklistSlide,
  "quote-stat": QuoteStatSlide,
} as unknown as Record<SlideType, ComponentType<{ slide: never }>>;

export function SlideRenderer({ slide }: { slide: Slide }) {
  const Component = SLIDE_REGISTRY[slide.type] as ComponentType<{ slide: Slide }>;
  return <Component slide={slide} />;
}
