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
