import {NextFunction, Request, Response} from "express";
import { allBooks, createBook, getBooksByInformationId } from "../repositories/libBook.repository";
import { createInformation } from "../repositories/libBookInformation.repository";




  export const all= async() =>{
   
      const books=await allBooks();
  
      
     return books;
  
  }


  export const create = async (book) => {
 
     
      const informationRep = createBook(book);
  
      return informationRep;
  
  };
  
  export const createBookWithCopies = async (bookInfo, copiesNumber)=> {
    

   const create_info_book=await createInformation(bookInfo);

    const copies = Array.from({ length: copiesNumber }, async () => {

     const res= await createBook(create_info_book);
     

    });

  
};
export const addCopies = async (bookId, copiesNumber)=> {
    
 
  const copies = Array.from({ length: copiesNumber }, async () => {
  
    await createBook(bookId);

  });
  return "success"

};
export const getBooksByInformation = async (bookInfo)=> {

    const copiesBooks = await getBooksByInformationId(bookInfo);

    return copiesBooks;

};


