import MarkdownIt from "markdown-it";

// Raw HTML is disabled on purpose: post bodies come from a repo, and anything
// that gets into it must not be able to inject markup or scripts into the site.
const md = new MarkdownIt({ html: false, linkify: true });

const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));

md.renderer.rules.link_open = (tokens, index, options, env, self) => {
  const href = tokens[index].attrGet("href") ?? "";

  if (/^https?:\/\//i.test(href)) {
    tokens[index].attrSet("rel", "noopener noreferrer");
    tokens[index].attrSet("target", "_blank");
  }

  return defaultLinkOpen(tokens, index, options, env, self);
};

export function renderMarkdown(source: string): string {
  return md.render(source);
}
