import type { Lang } from "../i18n";
import { homeDefaults } from "./defaults";
import { homeContentSchema, type HomeContent } from "./schema";
import { readContentFile } from "./source";

export type { HomeContent } from "./schema";

/** Home page content for a language: remote when valid, bundled defaults otherwise. */
export async function getHomeContent(lang: Lang): Promise<HomeContent> {
  const path = `home/${lang}.json`;
  const raw = await readContentFile(path);

  if (raw === null) return homeDefaults[lang];

  try {
    const parsed = homeContentSchema.safeParse(JSON.parse(raw));

    if (parsed.success) return parsed.data;

    console.warn(`[content] ${path} is invalid, using defaults:`, parsed.error.issues);
  } catch (error) {
    console.warn(`[content] ${path} is not valid JSON, using defaults:`, error);
  }

  return homeDefaults[lang];
}
