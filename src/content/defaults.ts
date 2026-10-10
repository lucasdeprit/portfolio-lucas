import type { Lang } from "../i18n";
import type { HomeContent } from "./schema";

/**
 * Fallback used when the remote content repo is unreachable or invalid.
 * Keep it in sync with `home/<lang>.json` in the content repo.
 */
export const homeDefaults: Record<Lang, HomeContent> = {
  en: {
    documentType: "Personal Portfolio",
    focus: "Mobile · Backend · Agentic Systems",
    headline: ["SOFTWARE", "ENGINEER"],
    intro:
      "Hi, I'm Lucas. I build mobile products, backend tools and the occasional side project that probably started simpler than it ended.",
    facts: {
      status: "Currently Employed",
      role: "Software Engineer",
      location: "Madrid, Spain",
      experience: "Digital Transformation",
      version: "June 2026",
    },
    overview: [
      "I'm a software engineer focused on digital transformation, with a strong interest in building useful products, clean architectures and tools that make teams work smoother. Mobile development is one of the areas where I have built deeper experience.",
      "My curiosity usually jumps across the stack: one week it is a mobile app, the next a backend service, a homelab automation, a developer tool or an experiment with AI agents.",
      "This site collects projects, experiments, ideas and a few things I have learned while building along the way.",
    ],
    stack: [
      { title: "Mobile", text: "Swift, SwiftUI, Flutter, BLoC, modular architecture." },
      { title: "Backend", text: "Go, Node.js, FastAPI, PostgreSQL, REST APIs." },
      {
        title: "Architecture",
        text: "MVVM, Dependency Injection, Domain Driven Design, Clean Architecture.",
      },
      {
        title: "Agentic Systems",
        text: "Spec Driven Development, Coding Agents, Developer Tooling.",
      },
    ],
    projects: [
      {
        name: "Spec-Forge",
        url: "https://github.com/lucasdeprit/spec-forge",
        type: "Dev Tool",
        stack: "Go / HTML",
        status: "WIP",
        description:
          "CLI-first Specification Driven Development workspace for humans and AI agents across multiple repositories.",
      },
      {
        name: "Injector",
        url: "https://github.com/lucasdeprit/Injector",
        type: "Library",
        stack: "Swift / SPM",
        status: "Pre-Release",
        description:
          "Lightweight dependency injection framework for Swift, supporting singleton, transient and named registrations.",
      },
      {
        name: "PDF AI Reader",
        url: "https://github.com/lucasdeprit/SwiftUI_AI_PDFReader",
        type: "Research",
        stack: "SwiftUI / AI",
        status: "Experimental",
        description:
          "SwiftUI research prototype exploring Apple Foundation Models for on-device PDF analysis, OCR, search and Q&A.",
      },
    ],
    availability: "Available / 2026",
  },
  es: {
    documentType: "Portfolio personal",
    focus: "Móvil · Backend · Sistemas agénticos",
    headline: ["INGENIERO", "DE SOFTWARE"],
    intro:
      "Hola, soy Lucas. Construyo productos móviles, herramientas de backend y algún proyecto personal que probablemente empezó siendo más simple de lo que acabó.",
    facts: {
      status: "En activo",
      role: "Ingeniero de software",
      location: "Madrid, España",
      experience: "Transformación digital",
      version: "Junio 2026",
    },
    overview: [
      "Soy ingeniero de software centrado en la transformación digital, con mucho interés en construir productos útiles, arquitecturas limpias y herramientas que hagan que los equipos trabajen mejor. El desarrollo móvil es una de las áreas en las que tengo más experiencia.",
      "Mi curiosidad suele saltar por todo el stack: una semana es una app móvil, la siguiente un servicio backend, una automatización de homelab, una herramienta para desarrolladores o un experimento con agentes de IA.",
      "Esta web reúne proyectos, experimentos, ideas y algunas cosas que he aprendido por el camino.",
    ],
    stack: [
      { title: "Móvil", text: "Swift, SwiftUI, Flutter, BLoC, arquitectura modular." },
      { title: "Backend", text: "Go, Node.js, FastAPI, PostgreSQL, APIs REST." },
      {
        title: "Arquitectura",
        text: "MVVM, inyección de dependencias, Domain Driven Design, Clean Architecture.",
      },
      {
        title: "Sistemas agénticos",
        text: "Desarrollo guiado por especificaciones, agentes de código, herramientas para desarrolladores.",
      },
    ],
    projects: [
      {
        name: "Spec-Forge",
        url: "https://github.com/lucasdeprit/spec-forge",
        type: "Herramienta dev",
        stack: "Go / HTML",
        status: "En desarrollo",
        description:
          "Espacio de trabajo de desarrollo guiado por especificaciones, orientado a CLI, para personas y agentes de IA en varios repositorios.",
      },
      {
        name: "Injector",
        url: "https://github.com/lucasdeprit/Injector",
        type: "Librería",
        stack: "Swift / SPM",
        status: "Pre-release",
        description:
          "Framework ligero de inyección de dependencias para Swift, con registros singleton, transient y con nombre.",
      },
      {
        name: "PDF AI Reader",
        url: "https://github.com/lucasdeprit/SwiftUI_AI_PDFReader",
        type: "Investigación",
        stack: "SwiftUI / AI",
        status: "Experimental",
        description:
          "Prototipo de investigación en SwiftUI que explora Apple Foundation Models para analizar PDFs en el dispositivo: OCR, búsqueda y preguntas y respuestas.",
      },
    ],
    availability: "Disponible / 2026",
  },
};
