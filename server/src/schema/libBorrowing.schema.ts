import { z } from "zod";

export const createBorrowingSchema = z.object({
  body: z.object({
    book_id: z.string(),
    reader_id: z.string(),
  }),
});

export const updateBorrowingSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    book_id: z.string().optional(),
    reader_id: z.string().optional(),
  }).partial(),
});
