// libBook.entity.types.ts
export type LibBook ={
  id: number;
  is_taken: boolean;
  information: LibBookInformation;
  borrowings: LibBorrowing[];
}

// libBookInformation.entity.types.ts
export type LibBookInformation ={
  id: number;
  name: string;
  publication_year: number;
  author: string;
  price: number;
  publisher: LibPublisher;
}

// libBorrowing.entity.types.ts
export type LibBorrowing ={
  id: number;
  borrow_date: Date;
  return_date: Date | null;
  book_id: LibBook;
  reader_id: LibReader;
}

// libPublisher.entity.types.ts
export type LibPublisher= {
  id: number;
  name: string;
  address: string;
  email: string;
  information_books: LibBookInformation[];
}

// libReader.entity.types.ts
export type LibReader ={
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date | null;
  borrowings: LibBorrowing[];
  age: number | undefined;
}
export type createBorrow={
  book_id: number,
  reader_id: number,
}
export type readerDetails={
  id: number;
  age: number;
  first_name: string;
  last_name: string;
}
export type ResultBorrowing = {
  res_borrowings: {
    id: string;
    borrow_date: Date;
    return_date: Date | null;
    book_id: {
      id: string;
      is_taken: boolean;
      information: LibBookInformation;
    };
    reader_id: {
      id: string;
      first_name: string;
      last_name: string;
      birth_date: Date;
    };
  };
};
export type createLibBookInformation ={
  name: string;
  publication_year: number;
  author: string;
  price: number;
  publisher: number;
}
