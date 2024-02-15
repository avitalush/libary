import { z } from "zod";

export const createBorrowingSchema = z.object({
  body: z.object({
    book: z.string(),
    reader: z.string(),
  }),
});

export const updateBorrowingSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      book: z.string().optional(),
      reader: z.string().optional(),
    })
    .partial(),
});
