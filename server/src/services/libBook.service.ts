import BookRepository from "../repositories/libBook.repository";
import BookInformationRepository from "../repositories/libBookInformation.repository";
import { LibBookInformation, createLibBookInformation } from "../types";

const BookService = {
  all: () => BookRepository.findAll(),
  create: (book: LibBookInformation) => BookRepository.saveNew(book),
  createBookWithCopies: async (
    bookInfo: createLibBookInformation,
    copiesNumber: number,
  ) => {
    const createInfoBook = await BookInformationRepository.createNew(bookInfo);
    await BookService.addCopies(createInfoBook, copiesNumber);
  },
  addCopies: async (book: LibBookInformation, copiesNumber: number) => {
    await Promise.all(
      Array.from({ length: copiesNumber }, async () => {
        await BookRepository.saveNew(book);
      }),
    );
    return "success";
  },
  update: async (bookInfo: string, key: string, value: boolean) => {
    const bookToUpdate = BookRepository.findById(bookInfo);
    if (!bookToUpdate) {
      throw new Error("Book not found");
    }

    bookToUpdate[key] = value;
    return BookRepository.save(await bookToUpdate);
  },

  getBooksByInformation: async (bookInfo: string) =>
    BookRepository.findInformationId(bookInfo),
};

export default BookService;
