import { z } from "zod";

export const createBookInformationSchema = z.object({
  body: z.object({
    book: z.object({
      name: z.string().min(1, { message: "Name must be greater than 1 character!" }),
      publication_year: z.number(),
      author: z.string().min(1, { message: "Author must be greater than 1 character!" }),
      publisher: z.string().nullable(), 
   price:z.number().min(10, { message: "Price must be greater than 10 dollar!" }),
    }), 
    copiesNumber: z.number().min(1, { message: "Number of copies must be at least 1!" }), 
  }),
});
export const createCopiesSchema = z.object({
  idBook: z.string(),
  copiesNumber: z.number().min(1, { message: "Number of copies must be at least 1!" }), 
});