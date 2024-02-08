import { z } from "zod";

export const createBookSchema = z.object({
  body: z.object({
    information: z.string(),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    information: z.string().optional(),
  }),
});
