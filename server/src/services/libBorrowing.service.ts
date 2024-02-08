import { NextFunction, Request, Response } from "express";
import { allBorrowings, createBorrowings, findInformation, getOverdueReturns, getTopBorrowedBooks,allBorrowingsIncludingReturned, updateReturnDate } from "../repositories/libBorrowing.repository";
import {  getBooksFortake, update } from "../repositories/libBook.repository";

import { findBorrowingsById } from "../repositories/libBorrowing.repository";
import { getReaderById } from "../repositories/libReader.repository";
import { createBorrow } from "../types";
import { Lib_borrowing } from "../entity/libBorrowing.entity";



export const all = async () => {
  

    const books = await allBorrowingsIncludingReturned();


    return books;

}


export const create = async (book:createBorrow) => {
  

    const res_book = await getBooksFortake(book.book_id)

    
    const bookDetails = res_book
    const reader_res = await getReaderById(book.reader_id)
    
    if (reader_res) {
      const { id, age, first_name, last_name } = reader_res;
      const readerDetails = {
        id: id,
        age: age,
        first_name: first_name,
        last_name: last_name
      };
    const res_save = createBorrowings(bookDetails,readerDetails);

  await update(res_book.id, "is_taken", true)
      
      
      return res_save;
    }

}


export const updateDate = async (borrowingId:number) => {
  
    const res_borrowings = await findBorrowingsById(borrowingId);
   
    const informationRep =await updateReturnDate(res_borrowings);

console.log(informationRep);

   await update(res_borrowings.book_id.id, "is_taken", false)

    return informationRep;

}
export const checkOverdueReturns = async () => {

    const overdueBorrowings = await getOverdueReturns();
    return overdueBorrowings;
 
}
export const getTopTenBorrowedBooks = async () => {
 

    const books = await getTopBorrowedBooks();


    return books;

}



