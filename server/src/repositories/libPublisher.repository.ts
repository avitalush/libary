import { Lib_book_information } from "../entity/libBookInformation.entity";
import { Lib_publisher } from "../entity/libPublisher.entity";
import { LibPublisher } from "../types";
const PublisherRepository = {
  findAll: () => Lib_publisher.find(),

  add: (publisher: LibPublisher) =>
    Lib_publisher.save({
      name: publisher.name,
      address: publisher.address,
      email: publisher.email,
    }),

  reportData: () =>
    Lib_publisher.find({ relations: { information_books: true } }),

  delete: async (publisherID: string) => {
    const booksWithNotNullReturnDate =
      await Lib_book_information.createQueryBuilder("info")
        .select("info.id", "borrowingId")
        .where("info.publisher = :publisherID", { publisherID })
        .getRawMany();
    if (booksWithNotNullReturnDate.length > 0) {
      throw new Error(`Cannot delete publisher `);
    } else {
      const publisherToRemove = await Lib_publisher.findOneBy({
        id: publisherID,
      });

      await Lib_publisher.softRemove(publisherToRemove);
    }
  },
};
export default PublisherRepository;
