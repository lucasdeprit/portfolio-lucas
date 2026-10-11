import { languages, type Lang } from "../i18n";
import { postDefaults, type Post } from "../data/posts";
import { renderMarkdown } from "./markdown";
import { postMetaSchema, slugSchema } from "./schema";
import { listContentDirs, readContentFile } from "./source";

export type { Post } from "../data/posts";

// Legacy article bodies that live in the repo as components: src/posts/<lang>/<slug>.astro
const bodyComponents = import.meta.glob("../posts/*/*.astro", { eager: true }) as Record<
  string,
  { default: unknown }
>;

async function readPost(slug: string): Promise<Post | null> {
  const path = `posts/${slug}/meta.json`;
  const raw = await readContentFile(path);

  if (raw === null) return null;

  try {
    const parsed = postMetaSchema.safeParse(JSON.parse(raw));

    if (!parsed.success) {
      console.warn(`[content] ${path} is invalid, skipping the post:`, parsed.error.issues);
      return null;
    }

    const { number, status, statusLabel, text } = parsed.data;
    const fallback = text.en ?? text.es!;

    return {
      slug,
      number,
      status,
      statusLabel: statusLabel ?? {},
      text: { en: text.en ?? fallback, es: text.es ?? fallback },
    };
  } catch (error) {
    console.warn(`[content] ${path} is not valid JSON, skipping the post:`, error);
    return null;
  }
}

/**
 * Every post in the content repo, whatever its status, ordered by number.
 * If the repo cannot be listed, the bundled defaults are used. Once it can,
 * the repo is the source of truth: a post missing or invalid there is not served.
 */
export async function getPosts(): Promise<Post[]> {
  const names = await listContentDirs("posts");

  if (names === null) return postDefaults;

  const posts = await Promise.all(
    names.filter((name) => slugSchema.safeParse(name).success).map(readPost),
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => a.number.localeCompare(b.number) || a.slug.localeCompare(b.slug));
}

export async function getPublishedPosts(): Promise<Post[]> {
  return (await getPosts()).filter((post) => post.status === "published");
}

/** A post by slug, whatever its status. Callers decide what to do with non-published ones. */
export async function getPost(slug: string | undefined): Promise<Post | null> {
  if (!slug || !slugSchema.safeParse(slug).success) return null;

  return (await getPosts()).find((post) => post.slug === slug) ?? null;
}

export type PostBody =
  | { kind: "markdown"; html: string; lang: Lang }
  | { kind: "component"; component: unknown; lang: Lang };

/**
 * Body of a post. Per language, `posts/<slug>/<lang>.md` in the content repo wins
 * over a component in `src/posts/<lang>/`. If the requested language has neither,
 * the other language is used (the page then shows a notice). `null` means no body.
 */
export async function getPostBody(slug: string, lang: Lang): Promise<PostBody | null> {
  const order = [lang, ...languages.filter((candidate) => candidate !== lang)];

  for (const candidate of order) {
    const markdown = await readContentFile(`posts/${slug}/${candidate}.md`);

    if (markdown !== null && markdown.trim() !== "") {
      return { kind: "markdown", html: renderMarkdown(markdown), lang: candidate };
    }

    const component = bodyComponents[`../posts/${candidate}/${slug}.astro`];

    if (component) return { kind: "component", component: component.default, lang: candidate };
  }

  return null;
}
