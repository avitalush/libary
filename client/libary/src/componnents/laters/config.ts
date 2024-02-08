import { LibBorrowing } from "../../interfaces";

export   const columns = [
    { id: "book_name", label: "first name", minWidth: 100, align: "center" },
    { id: "borrow_date", label: "borrow_date", minWidth: 170, align: "center" },
    { id: "reader_name", label: "reader_name", minWidth: 170, align: "center" },
  ];
  function createData(
    code: number,
    book_name: string,
    borrow_date: Date,
    reader_name: string
  ) {
    const formattedBorrowDate = new Date(borrow_date).toLocaleString();

    console.log({ reader_name });

    return { book_name, borrow_date: formattedBorrowDate, reader_name };
  }
  export const convertData=(data:LibBorrowing[])=>{
  
        const rowData=data.map((item: LibBorrowing) =>
          createData(
            item.id,
            item?.book_id?.information?.name,
            item.borrow_date,
            item.reader_id.first_name + " " + item.reader_id.last_name
          ))
        return rowData;
      
  }