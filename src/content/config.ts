import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    draft: z.boolean().default(false),
    sourceId: z.string().optional(),
  }),
});

export const collections = { blog };
