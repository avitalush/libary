import { Lib_book } from "../entity/libBook.entity";
import { LibBook, LibBookInformation } from "../types";

const BookRepository = {
  findAll: () => Lib_book.find(),
  findById: (bookId: string) => Lib_book.findOneBy({ id: bookId }),
  saveNew: (book: LibBookInformation) => Lib_book.save({ information: book }),
  save: (book: LibBook) =>
    Lib_book.save({ id: book.id, isTaken: book.isTaken }),

  findInformationId: (informationId: string) => {
    return Lib_book.find({
      where: {
        information: { id: informationId },
      },
      relations: {
        borrowings: true,
      },
    });
  },
  getBookForTake: (informationId: string) => {
    return Lib_book.findOne({
      where: {
        information: { id: informationId },
        isTaken: false,
      },
    });
  },
};

export default BookRepository;
