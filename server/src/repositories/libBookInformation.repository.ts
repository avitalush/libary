import { Lib_book_information } from "../entity/libBookInformation.entity";
import { LibBookInformation, createLibBookInformation } from "../types";
const BookInformationRepository = {
  findAll: () =>
    Lib_book_information.find({
      relations: {
        books: true,
      },
    }),
  findById: (informationId: string) =>
    Lib_book_information.findOne({
      where: {
        id: informationId,
      },
      relations: {books:true},
    }),
  createNew: ({ publisher, ...rest }: createLibBookInformation) =>
    Lib_book_information.save({
      ...rest,
      publisher: {
        id: publisher,
      },
    }),

  calculatePublisherPayments: () =>
    Lib_book_information.createQueryBuilder("bookInfo")
      .select([
        "publisher.id AS publisherId",
        "publisher.name AS publisherName",
        "SUM(bookInfo.price)  AS paymentAmount",
      ])
      .leftJoin("bookInfo.publisher", "publisher")

      .leftJoin("bookInfo.books", "book")
      .groupBy("publisher.id")
      .getRawMany(),

  isDeletable: (bookInformation: LibBookInformation) => {
    return bookInformation.books.some((book) => book.isTaken === true);
  },

  remove: (bookToRemove: Lib_book_information) =>
    Lib_book_information.softRemove(bookToRemove),
};

export default BookInformationRepository;
