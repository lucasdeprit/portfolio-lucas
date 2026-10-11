import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const env = (name: string): string | undefined =>
  process.env[name] ?? (import.meta.env[name] as string | undefined) ?? undefined;

const REQUEST_TIMEOUT_MS = 4000;
// A warm function instance shares reads for a short time so bursts of requests
// (for example crawlers hitting unknown URLs) do not each reach the GitHub API.
const CACHE_TTL_MS = 30_000;
const FAILURE_TTL_MS = 10_000;

type CacheEntry = { expires: number; value: Promise<unknown> };
const cache = new Map<string, CacheEntry>();

function cached<T>(key: string, load: () => Promise<T | null>): Promise<T | null> {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as Promise<T | null>;

  const value = load();
  const entry: CacheEntry = { expires: Date.now() + CACHE_TTL_MS, value };
  cache.set(key, entry);

  void value.then((result) => {
    if (result === null) entry.expires = Date.now() + FAILURE_TTL_MS;
  });

  return value;
}

/** Paths come from file names and URL slugs, so they must never escape the content root. */
function isSafePath(path: string): boolean {
  return /^[A-Za-z0-9._/-]+$/.test(path) && !path.split("/").some((part) => part === ".." || part === "");
}

function githubRequest(path: string, accept: string): Promise<Response> {
  const token = env("GITHUB_CONTENT_TOKEN") as string;
  const repo = env("CONTENT_REPO") ?? "lucasdeprit/portfolio-content";
  const ref = env("CONTENT_REF") ?? "main";
  const api = env("GITHUB_API_URL") ?? "https://api.github.com";

  return fetch(`${api}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`, {
    headers: {
      Accept: accept,
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

/**
 * Where content comes from, in order of precedence:
 * 1. `CONTENT_DIR`: a local checkout, handy for development (never cached).
 * 2. GitHub API on `CONTENT_REPO` (default `lucasdeprit/portfolio-content`) at
 *    `CONTENT_REF` (default `main`), authenticated with `GITHUB_CONTENT_TOKEN`
 *    (`GITHUB_API_URL` overrides the API host, e.g. for tests).
 *
 * Every read returns `null` (never throws) when no source is configured or the
 * read fails, so callers can fall back.
 */

/** Reads a text file from the content repo. */
export async function readContentFile(path: string): Promise<string | null> {
  if (!isSafePath(path)) return null;

  const dir = env("CONTENT_DIR");

  if (dir) {
    try {
      return await readFile(join(dir, path), "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.warn(`[content] could not read ${path} from CONTENT_DIR:`, error);
      }
      return null;
    }
  }

  if (!env("GITHUB_CONTENT_TOKEN")) return null;

  return cached(`file:${path}`, async () => {
    try {
      const response = await githubRequest(path, "application/vnd.github.raw+json");

      if (!response.ok) {
        console.warn(`[content] ${path} returned HTTP ${response.status}`);
        return null;
      }

      return await response.text();
    } catch (error) {
      console.warn(`[content] could not fetch ${path}:`, error);
      return null;
    }
  });
}

/** Lists the names of the sub-directories of a directory in the content repo. */
export async function listContentDirs(path: string): Promise<string[] | null> {
  if (!isSafePath(path)) return null;

  const dir = env("CONTENT_DIR");

  if (dir) {
    try {
      const entries = await readdir(join(dir, path), { withFileTypes: true });
      return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch (error) {
      console.warn(`[content] could not list ${path} from CONTENT_DIR:`, error);
      return null;
    }
  }

  if (!env("GITHUB_CONTENT_TOKEN")) return null;

  return cached(`dir:${path}`, async () => {
    try {
      const response = await githubRequest(path, "application/vnd.github+json");

      if (!response.ok) {
        console.warn(`[content] listing ${path} returned HTTP ${response.status}`);
        return null;
      }

      const entries = (await response.json()) as { name: string; type: string }[];
      return Array.isArray(entries)
        ? entries.filter((entry) => entry.type === "dir").map((entry) => entry.name)
        : null;
    } catch (error) {
      console.warn(`[content] could not list ${path}:`, error);
      return null;
    }
  });
}
