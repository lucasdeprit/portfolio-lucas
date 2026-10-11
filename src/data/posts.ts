import type { Lang } from "../i18n";
import type { PostStatus } from "../content/schema";

type PostText = {
  title: string;
  topic: string;
  description: string;
  listLabel: string;
};

export type Post = {
  slug: string;
  number: string;
  status: PostStatus;
  statusLabel: Partial<Record<Lang, string>>;
  text: Record<Lang, PostText>;
};

/**
 * Fallback used when the content repo is unreachable. Keep it in sync with
 * `posts/<slug>/meta.json` in the content repo.
 */
export const postDefaults: Post[] = [
  {
    slug: "agent-loops-opencode",
    number: "001",
    status: "published",
    statusLabel: { en: "Published", es: "Publicado" },
    text: {
      en: {
        title: "Agent Loops: turning attempts into results",
        topic: "Agentic Development",
        description:
          "A simple, visual explanation of Agent loops, why they matter and how to integrate them with OpenCode without turning them into magic.",
        listLabel: "Note / Published",
      },
      es: {
        title: "Agent Loops: convertir intentos en resultados",
        topic: "Desarrollo agéntico",
        description:
          "Una explicación simple y visual de los Agent loops, por qué importan y cómo integrarlos con OpenCode sin convertirlos en magia.",
        listLabel: "Nota / Publicada",
      },
    },
  },
  {
    slug: "specforge-agent-workflows",
    number: "002",
    status: "published",
    statusLabel: {},
    text: {
      en: {
        title: "SpecForge And Agent-Ready Specifications",
        topic: "Specification Driven Development",
        description:
          "Notes on structuring project knowledge so humans and AI agents can work from the same source of truth.",
        listLabel: "Idea / WIP",
      },
      es: {
        title: "SpecForge y especificaciones listas para agentes",
        topic: "Desarrollo guiado por especificaciones",
        description:
          "Notas sobre cómo estructurar el conocimiento del proyecto para que personas y agentes de IA trabajen desde la misma fuente de verdad.",
        listLabel: "Idea / WIP",
      },
    },
  },
  {
    slug: "swift-dependency-injection",
    number: "003",
    status: "published",
    statusLabel: {},
    text: {
      en: {
        title: "Dependency Injection Patterns In Swift",
        topic: "Swift Architecture",
        description:
          "A future write-up about lightweight dependency registration, resolution scopes and modular Swift codebases.",
        listLabel: "Idea / WIP",
      },
      es: {
        title: "Patrones de inyección de dependencias en Swift",
        topic: "Arquitectura Swift",
        description:
          "Un artículo futuro sobre registro ligero de dependencias, ámbitos de resolución y bases de código Swift modulares.",
        listLabel: "Idea / WIP",
      },
    },
  },
  {
    slug: "on-device-foundation-models",
    number: "004",
    status: "published",
    statusLabel: {},
    text: {
      en: {
        title: "On-Device AI With Apple Foundation Models",
        topic: "Apple Intelligence Research",
        description:
          "Research notes around OCR, semantic search and Q&A over PDFs using SwiftUI, Vision and Foundation Models.",
        listLabel: "Idea / WIP",
      },
      es: {
        title: "IA en el dispositivo con Apple Foundation Models",
        topic: "Investigación en Apple Intelligence",
        description:
          "Notas de investigación sobre OCR, búsqueda semántica y preguntas y respuestas sobre PDFs con SwiftUI, Vision y Foundation Models.",
        listLabel: "Idea / WIP",
      },
    },
  },
];
