import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    homeTitle: "Lucas Deprit | Ingeniero de Software",
    homeDescription:
      "Ingeniero de software centrado en iOS, sistemas backend, herramientas de IA y desarrollo agéntico.",
    postTitle: "{title} | Lucas Deprit",
    wipTitle: "{title} | En construcción",
    wipDescription: "{title} es una nota de investigación en construcción de Lucas Deprit.",
  },
  popup: {
    status: "Nuevo / Publicado",
    title: "Agent Loops",
    meta: "Convertir intentos en resultados",
    ariaLabel: "Leer el nuevo artículo sobre Agent Loops",
  },
  sidebar: {
    developer: "Portfolio",
    portfolio: "de desarrollador",
    index: "Índice",
    linkedinAria: "Abrir el LinkedIn de Lucas Deprit",
    linkedinCaption: "LinkedIn / 01",
    internalDocument: "Documento interno",
  },
  nav: {
    overview: "Resumen",
    stack: "Stack principal",
    projects: "Proyectos",
    posts: "Notas",
    contact: "Contacto",
  },
  header: {
    project: "Proyecto",
    documentType: "Tipo de documento",
    documentTypeValue: "Portfolio personal",
    focus: "Enfoque",
    focusValue: "Móvil · Backend · Sistemas agénticos",
    titleLine1: "INGENIERO",
    titleLine2: "DE SOFTWARE",
    intro:
      "Hola, soy Lucas. Construyo productos móviles, herramientas de backend y algún proyecto personal que probablemente empezó siendo más simple de lo que acabó.",
  },
  controls: {
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    activateDark: "Activar modo oscuro",
    activateLight: "Activar modo claro",
    language: "Idioma",
    switchLanguage: "Switch to English",
  },
  facts: {
    status: "Estado",
    statusValue: "En activo",
    role: "Rol",
    roleValue: "Ingeniero de software",
    location: "Ubicación",
    locationValue: "Madrid, España",
    experience: "Experiencia",
    experienceValue: "Transformación digital",
    version: "Versión",
    versionValue: "Junio 2026",
  },
  overview: {
    heading: "Resumen",
    p1: "Soy ingeniero de software centrado en la transformación digital, con mucho interés en construir productos útiles, arquitecturas limpias y herramientas que hagan que los equipos trabajen mejor. El desarrollo móvil es una de las áreas en las que tengo más experiencia.",
    p2: "Mi curiosidad suele saltar por todo el stack: una semana es una app móvil, la siguiente un servicio backend, una automatización de homelab, una herramienta para desarrolladores o un experimento con agentes de IA.",
    p3: "Esta web reúne proyectos, experimentos, ideas y algunas cosas que he aprendido por el camino.",
  },
  stack: {
    heading: "Stack principal",
    mobile: "Móvil",
    mobileText: "Swift, SwiftUI, Flutter, BLoC, arquitectura modular.",
    backend: "Backend",
    backendText: "Go, Node.js, FastAPI, PostgreSQL, APIs REST.",
    architecture: "Arquitectura",
    architectureText:
      "MVVM, inyección de dependencias, Domain Driven Design, Clean Architecture.",
    agentic: "Sistemas agénticos",
    agenticText:
      "Desarrollo guiado por especificaciones, agentes de código, herramientas para desarrolladores.",
  },
  projects: {
    heading: "Proyectos destacados",
    type: "Tipo",
    stack: "Stack",
    status: "Estado",
    specForge: {
      description:
        "Espacio de trabajo de desarrollo guiado por especificaciones, orientado a CLI, para personas y agentes de IA en varios repositorios.",
      type: "Herramienta dev",
      status: "En desarrollo",
    },
    injector: {
      description:
        "Framework ligero de inyección de dependencias para Swift, con registros singleton, transient y con nombre.",
      type: "Librería",
      status: "Pre-release",
    },
    pdfReader: {
      name: "PDF AI Reader",
      description:
        "Prototipo de investigación en SwiftUI que explora Apple Foundation Models para analizar PDFs en el dispositivo: OCR, búsqueda y preguntas y respuestas.",
      type: "Investigación",
      status: "Experimental",
    },
  },
  posts: {
    heading: "Notas de investigación",
  },
  footer: {
    emailAria: "Enviar un email a Lucas Deprit",
    contact: "Contacto",
    linkedin: "LinkedIn",
    location: "Ubicación",
    availability: "Disponible / 2026",
  },
  post: {
    researchNote: "Nota de investigación",
    statusLabel: "Estado",
    defaultStatus: "En construcción",
    draftStatus: "Borrador",
    backAria: "Volver a las notas del portfolio",
    returnLabel: "Volver",
    portfolio: "Portfolio",
    portfolioIndex: "Índice del portfolio",
    documentState: "Estado del documento",
    notPublished: "No publicado",
    documentFlow: "Flujo del documento",
    nextAction: "Siguiente paso",
    flowPublished: ["Leer", "Reflexionar", "Cuestionar"],
    flowWip: ["Esquema", "Ejemplos", "Notas finales"],
    wipTag: "WIP",
    wipHeading: "En construcción",
    wipNotice:
      "Esta nota aún no está publicada. El tema queda aquí como una cola de escritura pública mientras evoluciona el trabajo de fondo.",
    onlyInLanguage: "Este artículo solo está disponible en español.",
    language: "Idioma",
  },
};
