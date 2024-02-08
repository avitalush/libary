import { Lib_borrowing } from "../entity/libBorrowing.entity";
import {Lib_reader} from "../entity/libReader.entity";
import { LibPublisher, LibReader } from "../types";




  export const allReaders= () =>Lib_reader.find()
    



  export const createReader= (reader:LibReader) =>Lib_reader.save({
    first_name: reader.first_name,
    last_name: reader.last_name,
    birth_date: reader.birth_date
  })
    
     
  export const deleteReader = async (readerID: number) => {
    // מצא את הקורא המתאים לפי ה־ID
    const readerToRemove = await Lib_reader.findOneBy({id:readerID});

    // בדוק אם יש ספרים שעדיין בחזקתו של הקורא הזה
    const booksBorrowed = await Lib_borrowing.count({
        where: {
            reader_id: readerToRemove,
            return_date: null // בדוק רק את הספרים שלא נחזרו עדיין
        }
    });

    // אם יש ספרים שלא נחזרו עדיין
    if (booksBorrowed > 0) {
      console.log("not deleted");
      
        throw new Error(`Cannot delete reader. There are still ${booksBorrowed} books borrowed by this reader.`);
    }

    // אם אין ספרים שלא נחזרו, מחק את הקורא
    await Lib_reader.remove(readerToRemove);
};

  
     
   
  
  
  export const getReaderById =  (readerId:number) => {
 

      return Lib_reader
        .createQueryBuilder('reader')
        .leftJoinAndSelect('reader.borrowings', 'borrowing')
        .leftJoinAndSelect('borrowing.book_id', 'book')
        .leftJoinAndSelect('book.information', 'information')
        .where('reader.id = :readerId', { readerId })
        .getOne(); 
  };
 