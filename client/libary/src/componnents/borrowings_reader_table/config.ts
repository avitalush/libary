import { LibBorrowing } from "../../interfaces";

export const columns = [
    { id: 'Borrow_date', label: 'Borrow date', minWidth: 100, align: 'center' },
    { id: 'Return_date', label: 'Return date', minWidth: 170, align: 'center' },
    { id: 'Name_Book', label: 'Name book', minWidth: 170, align: 'center' },
    { id: 'code', label: 'Code', minWidth: 100, align: 'center' },
  ];
  function createData(code: number, Borrow_date: Date | null, Return_date: Date | null, Name_Book: string) {

    
    const formattedBorrowDate = Borrow_date ? new Date(Borrow_date).toLocaleString() : "";
    const formattedReturnDate = Return_date ? new Date(Return_date).toLocaleString() : "";
    return { code, Borrow_date: formattedBorrowDate, Return_date: formattedReturnDate, Name_Book };
  }
export const convertData=(data: LibBorrowing[])=>{

    const sortedRows = data?.sort((a, b) => Number(b.borrow_date) - Number(a.borrow_date));
 const rowsData = sortedRows?.map((item: LibBorrowing) =>
          createData(
            item.id,
            item.borrow_date,
            item.return_date,
            item.book_id?.information.name ?? "N/A"
          )
        );
        return rowsData;
}