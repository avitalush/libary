export type LibBookInformation ={
    id: number;
    name?: string;
    publication_year: number;
    author: string;
    is_available: boolean;
    publisher: LibPublisher;
    books: LibBook[];
  }
  
  export type LibBook ={
    id: number;
    information: LibBookInformation;
    borrowings: LibBorrowing[];
    is_taken: boolean

  }
  
  export type LibBorrowing ={
    [x: string]: any;
    id: number;
    borrow_date: Date;
    return_date: Date;
    book_id: LibBook;
    reader_id: LibReader;
  }
  
  export type LibPublisher ={
    id: number;
    name: string;
    address: string;
    email: string;
    information_books: LibBookInformation[];
  }
  
  export type LibReader ={
    id: number;
    first_name: string;
    last_name: string;
    age: string;
    borrowings: LibBorrowing[];
  }
  export type Laters ={
    code: number; book_name: string; borrow_date: Date; reader_name: string;
  }
  export type Top_Books= {
    bookId: string;
    bookName: string;
    bookInfo_is_available: boolean;
    bookInfo_publication_year: number;
    bookInfo_author: string;
    bookInfo_publisherIdId: string;
    count: number;
  }
  export type FiltersComponentProps = {
    handleChangeValue: (name: string, value: Date | null | boolean | string) => void;
    filterObject: { searchBorrowDate: Date | null; searchBookName: string; displayAll: boolean };
  };
  export type  FormDataBook= {
    name: string;
    author: string;
    price:number;
    publication_year: number;
    numOfCopies:number;
    publisher:LibPublisher|{};
  }
  
export type   FormDataPublisher= {
  name: string;
  address: string;
  email: string;
}
export type  FormDataReader ={
  first_name: string;
  last_name: string;
  birth_date: Date;
}
export type DataGraph = {
  bookName: string;
  count: number | null;
};
export type PublisherPayment = {
  publisherid: string;
  publishername: string;
  paymentamount: string;
};
