import BookRepository from "../repositories/libBook.repository";
import BookInformationRepository from "../repositories/libBookInformation.repository";
import { createLibBookInformation } from "../types";

const InformationService = {
  all: () => BookInformationRepository.findAll(),
  createBookWithCopies: async (
    bookInfo: createLibBookInformation,
    copiesNumber: number,
  ) => {
    const createInfoBook = await BookInformationRepository.createNew(bookInfo);
    return Promise.all(
      Array.from({ length: copiesNumber }, () =>
        BookRepository.saveNew(createInfoBook),
      ),
    );
  },
  deleteInfo: async (infoId: string) => {
    const infoBook = BookInformationRepository.findById(infoId);
    if (!BookInformationRepository.isDeletable(await infoBook)) {
      BookInformationRepository.remove(await infoBook);
    } else {
      throw new Error(`Cannot delete book.`);
    }
  },
};

export default InformationService;
