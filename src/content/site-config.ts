import { siteConfigSchema, type SiteConfig } from "./schema";
import { readContentFile } from "./source";

/** Fallback used when `config.json` is missing or invalid: the current popup, with no dates. */
export const siteConfigDefaults: SiteConfig = {
  popup: {
    post: "agent-loops-opencode",
    text: {
      en: { title: "Agent Loops", meta: "Turning attempts into results" },
      es: { title: "Agent Loops", meta: "Convertir intentos en resultados" },
    },
  },
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const raw = await readContentFile("config.json");

  if (raw === null) return siteConfigDefaults;

  try {
    const parsed = siteConfigSchema.safeParse(JSON.parse(raw));

    if (parsed.success) return parsed.data;

    console.warn("[content] config.json is invalid, using defaults:", parsed.error.issues);
  } catch (error) {
    console.warn("[content] config.json is not valid JSON, using defaults:", error);
  }

  return siteConfigDefaults;
}
