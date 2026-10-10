import type { APIRoute } from "astro";
import { posts } from "../data/posts";
import { alternates, languages } from "../i18n";

export const prerender = false;

const paths = ["/", ...posts.map((post) => `/posts/${post.slug}/`)];

export const GET: APIRoute = () => {
  const urls = paths.flatMap((path) => {
    const pageAlternates = alternates(path);
    const links = languages
      .map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageAlternates[lang]}" />`,
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageAlternates.en}" />`,
      )
      .join("\n");

    return languages.map(
      (lang) => `  <url>\n    <loc>${pageAlternates[lang]}</loc>\n${links}\n  </url>`,
    );
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
