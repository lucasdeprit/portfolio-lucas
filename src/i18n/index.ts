import { en, type Dictionary } from "./en";
import { es } from "./es";

export const languages = ["en", "es"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "en";
export const siteUrl = "https://lucasdeprit.dev";

const dictionaries: Record<Lang, Dictionary> = { en, es };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en";
}

export function interpolate(
  template: string,
  values: Record<string, string> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}

/** Path for a page in the given language, e.g. localePath("es", "/posts/x/") -> "/es/posts/x/". */
export function localePath(lang: Lang, path = "/"): string {
  return lang === defaultLang ? path : `/es${path}`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

/** Absolute URLs of the same page in every language, used for hreflang and the language switch. */
export function alternates(path = "/"): Record<Lang, string> {
  return {
    en: absoluteUrl(localePath("en", path)),
    es: absoluteUrl(localePath("es", path)),
  };
}
