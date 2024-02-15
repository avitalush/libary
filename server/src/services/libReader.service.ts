import BorrowingRepository from "../repositories/libBorrowing.repository";
import ReaderRepository from "../repositories/libReader.repository";
import { LibReader } from "../types";

const ReaderService = {
  all: () => ReaderRepository.findAll(),
  create: (reader: LibReader) => ReaderRepository.save(reader),
  getBorrowingsByReader: (reader_id: string) =>
    BorrowingRepository.findByReader(reader_id),
  deleteReaders: (reader_id: string) => ReaderRepository.remove(reader_id),
};

export default ReaderService;
