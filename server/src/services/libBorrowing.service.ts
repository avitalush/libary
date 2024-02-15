import BookRepository from "../repositories/libBook.repository";
import BorrowingRepository from "../repositories/libBorrowing.repository";
import ReaderRepository from "../repositories/libReader.repository";
import { createBorrow } from "../types";
import BookService from "./libBook.service";

const BorrowingService = {
  all: () => BorrowingRepository.findAllWithReaders(),
  create: async (book: createBorrow) => {
    const resBook = await BookRepository.getBookForTake(book.bookId);
    const readerRes = await ReaderRepository.getById(book.readerId);



    if (!readerRes) return;
    const { id, age, firstName, lastName } = readerRes;
    const readerDetails = { id, age, firstName, lastName };

    await BorrowingRepository.add(resBook, readerDetails);
    await BookService.update(resBook.id, "isTaken", true);
  },

  updateDate: async (borrowingId: string) => {
    const res_borrowings =
      await BorrowingRepository.findBorrowingsById(borrowingId);
    const informationRep =
      await BorrowingRepository.updateReturnDate(res_borrowings);
    BookService.update(res_borrowings.book.id, "is_taken", false);
    return informationRep;
  },
  checkOverdueReturns: () => BorrowingRepository.getOverdueReturns(),
  getTopTenBorrowedBooks: () => BorrowingRepository.getTopBorrowedBooks(),
};

export default BorrowingService;
