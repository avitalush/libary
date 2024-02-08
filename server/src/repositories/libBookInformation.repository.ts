import { Lib_book_information } from "../entity/libBookInformation.entity";
import { LibBookInformation, createLibBookInformation } from "../types";

export const allInformations =  () =>  Lib_book_information.find({ relations: ['books'] })


 
export const createInformation =  (info:createLibBookInformation) => {
  console.log(info);
  
  return Lib_book_information.save({
    name: info.name,
    publication_year: info.publication_year,
    author: info.author,
    price:info.price,
    publisher: {
      id: info.publisher,
    },
  });
};
export const calculatePublisherPayments =() => {
  return Lib_book_information
  .createQueryBuilder("bookInfo")
  .select([
    "publisher.id AS publisherId",
    "publisher.name AS publisherName",
    "SUM(bookInfo.price)  AS paymentAmount" 
  ])
  .leftJoin("bookInfo.publisher", "publisher")
  .leftJoin("bookInfo.books", "book")
  .groupBy("publisher.id")
  .getRawMany();


};


