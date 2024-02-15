import { IsNull, LessThan, SelectQueryBuilder } from "typeorm";
import { Lib_book_information } from "../entity/libBookInformation.entity";
import { Lib_borrowing } from "../entity/libBorrowing.entity";
import { LibBook, readerDetails } from "../types";

const BorrowingRepository = {
  findAll: () => Lib_borrowing.find({ withDeleted: true }),

  findAllWithReaders: () =>
    Lib_borrowing.find({
      relations: {
        book: true,
        reader: true,
      },
    }),

  add: (bookDetails: LibBook, readerDetail: readerDetails) =>
    Lib_borrowing.save({ book: bookDetails, reader: readerDetail }),

  findBorrowingsById: (borrowingId: string) =>
    Lib_borrowing.findOneBy({ id: borrowingId }),

  findByReader: (readerId: string) =>
    Lib_borrowing.find({
      relations: {book:true, reader:true},
      where: {
        reader: readerId !== "null" ? { id: readerId } : null,
      },
    }),

  updateReturnDate: (borrowingId: Lib_borrowing) =>
    Lib_borrowing.softRemove(borrowingId),

  getOverdueReturns: () => {
    const currentDate = new Date();

    return Lib_borrowing.find({
      where: {
        returnDate: IsNull(),

        borrowDate: LessThan(
          new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000),
        ),
      },
      relations: {
        reader: true,
      },
    });
  },

  getTopBorrowedBooks: () =>
    Lib_book_information.createQueryBuilder("bookInfo")
      .leftJoin("bookInfo.books", "book")
      .leftJoin("book.borrowings", "borrowing")
      .addSelect("bookInfo.id", "bookId")
      .addSelect("bookInfo.name", "bookName")
      .addSelect("COUNT(borrowing.id)", "count")
      .groupBy("bookInfo.id")
      .orderBy("count", "DESC")
      .getRawMany(),
};

export default BorrowingRepository;
