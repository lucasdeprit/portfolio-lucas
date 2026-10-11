import { getDictionary, interpolate, localePath, otherLang, type Lang } from "../i18n";
import { getSiteConfig } from "./site-config";
import { toInstant } from "./dates";
import { getPost } from "./posts";

export type PopupData = {
  href: string;
  storageKey: string;
  status: string;
  title: string;
  meta?: string;
  ariaLabel: string;
  /** Window in ms since epoch; the browser re-checks it because pages are cached. */
  from?: number;
  until?: number;
};

/** The popup to show right now for a language, or `null` when there is none. */
export async function getPopup(lang: Lang, now = Date.now()): Promise<PopupData | null> {
  const { popup } = await getSiteConfig();

  if (!popup) return null;

  const from = popup.from ? toInstant(popup.from, "start") : undefined;
  const until = popup.until ? toInstant(popup.until, "end") : undefined;

  if ((from !== undefined && now < from) || (until !== undefined && now >= until)) return null;

  const post = await getPost(popup.post);

  if (!post || post.status !== "published") return null;

  const t = getDictionary(lang);
  const text = popup.text?.[lang] ?? popup.text?.[otherLang(lang)];
  const title = text?.title ?? post.text[lang].title;

  return {
    href: localePath(lang, `/posts/${post.slug}/`),
    storageKey: popup.id ?? post.slug,
    status: text?.status ?? t.popup.status,
    title,
    meta: text ? text.meta : post.text[lang].topic,
    ariaLabel: interpolate(t.popup.ariaLabel, { title }),
    from,
    until,
  };
}
