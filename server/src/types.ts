export type LibBook = {
  id: string;
  isTaken: boolean;
  // information: LibBookInformation;
  //borrowings: LibBorrowing[];
};

export type LibBookInformation = {
  id: string;
  name: string;
  publicationYear: Date;
  isAvailable?: boolean;
  author: string;
  price: number;
  isDeleted: boolean;
  //publisher: LibPublisher;
  books: LibBook[];
};

export type LibBorrowing = {
  id: string;
  borrowDate: Date;
  returnDate: Date | null;
  bookId: LibBook;
  readerId: LibReader;
};
export type LibPublisher = {
  id: string;
  name: string;
  address: string;
  email: string;
  isDeleted: boolean;
  informationBooks: LibBookInformation[];
};

export type LibReader = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  age?: number;
};
export type createBorrow = {
  bookId: string;
  readerId: string;
};
export type readerDetails = {
  id: string;
  age: number;
  firstName: string;
  lastName: string;
};
export type ResultBorrowing = {
  resBorrowings: {
    id: string;
    borrowDate: Date;
    returnDate: Date | null;
    bookId: {
      id: string;
      isTaken: boolean;
      information: LibBookInformation;
    };
    readerId: {
      id: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
    };
  };
};
export type createLibBookInformation = {
  name: string;
  publicationYear: Date;
  author: string;
  price: number;
  publisher: string;
};
