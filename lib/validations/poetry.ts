import { z } from "zod";

// Author validation schema
export const authorSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  dynasty: z.string().min(1, "Dynasty is required"),
  biography: z.string().optional(),
});

// Poem validation schema
export const poemSchema = z.object({
  title: z.string().min(1, "Poem title is required"),
  content: z.string().min(1, "Poem content is required"),
  authorId: z.string().cuid("Invalid author ID format"),
  dynasty: z.string().min(1, "Dynasty is required"),
  tags: z.array(z.string()).default([]),
});

// Types inferred from schemas
export type AuthorInput = z.infer<typeof authorSchema>;
export type PoemInput = z.infer<typeof poemSchema>;
