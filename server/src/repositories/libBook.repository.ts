import { Lib_book } from "../entity/libBook.entity";
import { LibBook, LibBookInformation } from "../types";

export const allBooks =  () => Lib_book.find(); 
 


export const createBook = (book: LibBookInformation) => {
  console.log({book});
  
  return Lib_book.save({ information: book });
}
  



export const getBooksByInformationId = (informationId: number) => {
  return  Lib_book.find({
    where: {
      information: { id: informationId },
    },
    relations: ["borrowings"],
  });
};
export const getBooksFortake =  (informationId: number) => {
  return Lib_book.findOne({
    where: {
      information: { id: informationId },
      is_taken: false,
    },
  });
};
export const update = async (book_id:number, key:string, value:boolean) => {
  const bookToUpdate = await Lib_book.findOneBy({ id: book_id });
  if (!bookToUpdate) {
    throw new Error("Book not found");
  }

  bookToUpdate[key] = value;
  const res= Lib_book.save(await bookToUpdate);
  return res;
  
};
