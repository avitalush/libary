import { z } from "zod";

export const createPublisherSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 character!" }),
    address: z
      .string()
      .min(1, { message: "Address must be greater than 1 character!" }),
    email: z.string().email({ message: "Invalid email format!" }),
  }),
});

export const updatePublisherSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 character!" })
        .optional(),
      address: z
        .string()
        .min(1, { message: "Address must be greater than 1 character!" })
        .optional(),
      email: z.string().email({ message: "Invalid email format!" }).optional(),
    })
    .partial(),
});
