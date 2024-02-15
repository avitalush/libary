export type LibBookInformation = {
  id: string
  name: string
  publicationYear: Date
  author: string
  isAvailable: boolean
  publisher: LibPublisher
  books: LibBook[]
}

export type LibBook = {
  id: string
  information: LibBookInformation
  borrowings: LibBorrowing[]
  isTaken: boolean
}

export type LibBorrowing = {
  id: string
  borrowDate: Date
  returnDate: Date
  book: LibBook
  reader: LibReader
}

export type LibPublisher = {
  id: string
  name: string
  address: string
  email: string
  informationBooks: LibBookInformation[]
}

export type LibReader = {
  id: string
  firstName: string
  lastName: string
  age: string
  borrowings: LibBorrowing[]
}
export type Laters = {
  code: number
  bookName: string
  borrowDate: Date
  readerName: string
}
export type Top_Books = {
  bookId: string
  bookName: string
  bookInfo_is_available: boolean
  bookInfo_publication_year: number
  bookInfo_author: string
  bookInfo_publisherIdId: string
  count: number
}
export type FiltersComponentProps = {
  handleChangeValue: (
    name: string,
    value: Date | null | boolean | string,
  ) => void
  filterObject: {
    searchBorrowDate: Date | null
    searchBookName: string
    displayAll: boolean
  }
}
export type FormDataBook = {
  name: string
  author: string
  price: number
  publicationYear: number
  numOfCopies: number
  publisher: LibPublisher | {}
}

export type FormDataPublisher = {
  name: string
  address: string
  email: string
}
export type FormDataReader = {
  firstName: string
  lastName: string
  birthDate: Date
}
export type DataGraph = {
  bookName: string
  count: number | null
}
export type PublisherPayment = {
  publisherid: string
  publishername: string
  paymentamount: string
}
export type RowReader = {
  code: string
  Frist_Name: string
  Last_Name: string
  Age: string
}
