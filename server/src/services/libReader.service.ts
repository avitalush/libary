import { allReaders, createReader, deleteReader, getReaderById } from "../repositories/libReader.repository";
import { findBorrowingsByIdReader } from "../repositories/libBorrowing.repository";
import { LibReader } from "../types";




  export const all= () =>allReaders();

  


  export const create= (reader:LibReader) =>createReader(reader);

  


  export const getBorrowingsByReader= (reader_id:string) =>findBorrowingsByIdReader(reader_id);
  export const deleteReaders= (reader_id:number) =>deleteReader(reader_id);
