import {NextFunction, Request, Response} from "express";
import { allInformations, createInformation } from "../repositories/libBookInformation.repository";
import { createBook } from "../repositories/libBook.repository";
import { LibBook, LibBookInformation, createLibBookInformation } from "../types";
import { Lib_book } from "../entity/libBook.entity";




  export const all= async() =>{
   
     
      return await allInformations();
  
      
 
  }

  export const createBookWithCopies = async (bookInfo: createLibBookInformation, copiesNumber: number) => {
    console.log(bookInfo);
    
  const createInfoBook = await createInformation(bookInfo);
    console.log({createInfoBook});
    
    const copies = Array.from({ length: copiesNumber }, async () => {
     
      console.log(createInfoBook);
      
           const res= await createBook(createInfoBook);
           
      
          });
    return copies;
};


 
   



