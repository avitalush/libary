import { Lib_borrowing } from "../entity/libBorrowing.entity";
import { Lib_book_information } from "../entity/libBookInformation.entity";
import { IsNull, LessThan, Not } from "typeorm";
import { SelectQueryBuilder } from 'typeorm';
import { LibBook, readerDetails } from "../types";





   
export const allBorrowings =  () =>   Lib_borrowing.find({ withDeleted: true });


    


export const allBorrowingsIncludingReturned =  () => {
    return Lib_borrowing.find({
        relations: ["book_id", "reader_id"],
    });
}
export const findInformation =  (information_id:number) => Lib_book_information.findOneBy({ id: information_id });

   
 

export const createBorrowings =  (bookDetails:LibBook,readerDetail:readerDetails) =>  Lib_borrowing.save({book_id:bookDetails,reader_id:readerDetail});



export const findBorrowingsById =  (borrowing_id:number) => Lib_borrowing.findOneBy({ id: borrowing_id })
   
         



export const findBorrowingsByIdReader =  (readerId: string ) => {

   return Lib_borrowing
        .createQueryBuilder('borrowing')
        .leftJoinAndSelect('borrowing.book_id', 'book')
        .leftJoinAndSelect('book.information', 'info')
        .where((qb: SelectQueryBuilder<Lib_borrowing>) => {
            if (readerId !== "null") {                
                qb.where('borrowing.reader_id = :readerId', { readerId });
            }
        }).getMany();


};
  
export const updateReturnDate = (borrowingId: Lib_borrowing) =>  Lib_borrowing.softRemove(borrowingId);


export const getOverdueReturns =  () => {
   

        const currentDate = new Date();

        const overdueBorrowings =  Lib_borrowing.find({
            where: {
                return_date: IsNull(),


                borrow_date: LessThan(new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000)),
            },


            relations: ["reader_id"],

        });

return overdueBorrowings;
     

};

export const getTopBorrowedBooks =  () => {
  
        return Lib_book_information
            .createQueryBuilder("bookInfo")
            .leftJoin("bookInfo.books", "book")
            .leftJoin("book.borrowings", "borrowing")
            .addSelect("bookInfo.id", "bookId")
            .addSelect("bookInfo.name", "bookName")
            .addSelect("COUNT(borrowing.id)", "count")
            .groupBy("bookInfo.id")
            .orderBy("count", "DESC").withDeleted().getRawMany()
           

   
};


