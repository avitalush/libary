import { z } from "zod";

export const createReaderSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, { message: "First name must be greater than 1 character!" }),
    last_name: z.string().min(1, { message: "Last name must be greater than 1 character!" }),
    birth_date: z.string().min(1, { message: "Birth date must be greater than 1 character!" }), // Adjust the validation as needed
  }),
});

export const updateReaderSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    first_name: z.string().min(1, { message: "First name must be greater than 1 character!" }).optional(),
    last_name: z.string().min(1, { message: "Last name must be greater than 1 character!" }).optional(),
    birth_date: z.string().min(1, { message: "Birth date must be greater than 1 character!" }).optional(), // Adjust the validation as needed
  }).partial(),
});
