import { LibBorrowing } from '../../interfaces'

export const columns = [
  { id: 'Borrow_date', label: 'Borrow date', minWidth: 100, align: 'center' },
  { id: 'Return_date', label: 'Return date', minWidth: 170, align: 'center' },
  { id: 'Name_Book', label: 'Name book', minWidth: 170, align: 'center' },  
  { id: 'Reader_name', label: 'Reader name', minWidth: 170, align: 'center' },

]
function createData(
  code: string,
  Borrow_date: Date | null,
  Return_date: Date | null,
  Name_Book: string,
  Reader_name:string
) {
  const formattedBorrowDate = Borrow_date
    ? new Date(Borrow_date).toLocaleString().slice(0, -3)
    : ''
  const formattedReturnDate = Return_date
    ?new Date(Return_date).toLocaleString().slice(0, -3)
    : ''
  return {
    code,
    Borrow_date: formattedBorrowDate,
    Return_date: formattedReturnDate,
    Name_Book,  
      Reader_name:Reader_name,

  }
}
export const convertData = (data: LibBorrowing[]) => {
  const sortedRows = data?.sort(
    (a, b) => Number(b.borrowDate) - Number(a.borrowDate),
  )
  const rowsData = sortedRows?.map((item: LibBorrowing) =>
    createData(
      item.id,
      item.borrowDate,
      item.returnDate,
      item.book?.information.name ?? 'N/A',   
        item.reader?.firstName+" "+item.reader?.lastName,

    ),
  )
  return rowsData
}
