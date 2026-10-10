import { readFile } from "node:fs/promises";
import { join } from "node:path";

const env = (name: string): string | undefined =>
  process.env[name] ?? (import.meta.env[name] as string | undefined) ?? undefined;

const REQUEST_TIMEOUT_MS = 4000;

/**
 * Reads a text file from the content repo. Returns `null` (never throws) when
 * no source is configured or the read fails, so callers can fall back.
 *
 * Source, in order of precedence:
 * 1. `CONTENT_DIR`: a local checkout, handy for development.
 * 2. GitHub API on `CONTENT_REPO` (default `lucasdeprit/portfolio-content`) at
 *    `CONTENT_REF` (default `main`), authenticated with `GITHUB_CONTENT_TOKEN`
 *    (`GITHUB_API_URL` overrides the API host, e.g. for tests).
 */
export async function readContentFile(path: string): Promise<string | null> {
  const dir = env("CONTENT_DIR");

  if (dir) {
    try {
      return await readFile(join(dir, path), "utf8");
    } catch (error) {
      console.warn(`[content] could not read ${path} from CONTENT_DIR:`, error);
      return null;
    }
  }

  const token = env("GITHUB_CONTENT_TOKEN");
  if (!token) return null;

  const repo = env("CONTENT_REPO") ?? "lucasdeprit/portfolio-content";
  const ref = env("CONTENT_REF") ?? "main";
  const api = env("GITHUB_API_URL") ?? "https://api.github.com";
  const url = `${api}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.raw+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.warn(`[content] ${path} returned HTTP ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.warn(`[content] could not fetch ${path}:`, error);
    return null;
  }
}
