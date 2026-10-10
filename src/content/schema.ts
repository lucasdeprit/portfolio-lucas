import { z } from "astro/zod";

const text = z.string().min(1);

export const homeContentSchema = z.object({
  documentType: text,
  focus: text,
  headline: z.tuple([text, text]),
  intro: text,
  facts: z.object({
    status: text,
    role: text,
    location: text,
    experience: text,
    version: text,
  }),
  overview: z.array(text).min(1),
  stack: z.array(z.object({ title: text, text })).min(1),
  projects: z
    .array(
      z.object({
        name: text,
        url: z.string().url(),
        type: text,
        stack: text,
        status: text,
        description: text,
      }),
    )
    .min(1),
  availability: text,
});

export type HomeContent = z.infer<typeof homeContentSchema>;

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const postText = z.object({
  title: text,
  topic: text,
  description: text,
  listLabel: text,
});

/** `published` is public; `hidden` and `draft` answer 404 and stay out of lists and the sitemap. */
export const postStatusSchema = z.enum(["published", "hidden", "draft"]);
export type PostStatus = z.infer<typeof postStatusSchema>;

export const postMetaSchema = z.object({
  number: text,
  status: postStatusSchema,
  statusLabel: z.object({ en: text.optional(), es: text.optional() }).optional(),
  text: z
    .object({ en: postText.optional(), es: postText.optional() })
    .refine((value) => value.en || value.es, "at least one language is required"),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

// A date ("2026-11-15", Madrid time) or a full ISO instant with offset.
const dateField = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  z.string().datetime({ offset: true }),
]);

const popupText = z.object({
  status: text.optional(),
  title: text,
  meta: text.optional(),
});

export const siteConfigSchema = z.object({
  // Absent means no popup.
  popup: z
    .object({
      post: slugSchema,
      // Part of the "already seen" key; change it to show the popup again to everyone.
      id: text.optional(),
      from: dateField.optional(),
      until: dateField.optional(),
      text: z.object({ en: popupText.optional(), es: popupText.optional() }).optional(),
    })
    .optional(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
