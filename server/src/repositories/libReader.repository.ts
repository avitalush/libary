import { IsNull } from "typeorm";
import { Lib_borrowing } from "../entity/libBorrowing.entity";
import { Lib_reader } from "../entity/libReader.entity";
import { LibReader } from "../types";

const ReaderRepository = {
  findAll: () => Lib_reader.find(),

  save: (reader: LibReader) =>
    Lib_reader.save({
      firstName: reader.firstName,
      lastName: reader.lastName,
      birthDate: reader.birthDate,
    }),

  remove: async (readerID: string) => {
    const readerToRemove = await Lib_reader.findOneBy({ id: readerID });
    const booksBorrowed = await Lib_borrowing.findOne({
      where: {
        reader: { id: readerID },
        returnDate: IsNull(),
      },
      relations: { reader: true },
    });

    if (booksBorrowed) {
      throw new Error(`Cannot delete reader.`);
    } else {
      await Lib_reader.softRemove(readerToRemove);
    }
  },


  getById: (readerId: string) =>
  Lib_reader.findOneBy({id:readerId})
};
export default ReaderRepository;
