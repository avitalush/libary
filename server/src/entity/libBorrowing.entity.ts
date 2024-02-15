import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Lib_book } from "./libBook.entity";
import { Lib_reader } from "./libReader.entity";
import { IsDate } from "class-validator";
import { BaseClass } from "./baseClass";

@Entity()
export class Lib_borrowing extends BaseClass {
  @CreateDateColumn({ name: "borrow_date" })
  @IsDate()
  borrowDate: Date;

  @DeleteDateColumn({ nullable: true, name: "return_date" })
  @IsDate()
  returnDate: Date;

  @ManyToOne(() => Lib_book, (lib_book) => lib_book.borrowings, {
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  book: Lib_book;

  @ManyToOne(() => Lib_reader, (lib_reader) => lib_reader.borrowings, {   
   eager: true,
   onDelete: "CASCADE",

  })
  @JoinColumn()
  reader: Lib_reader;
}
