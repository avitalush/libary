import { IsBoolean } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lib_book_information } from "./libBookInformation.entity";
import { Lib_borrowing } from "./libBorrowing.entity";
import { BaseClass } from "./baseClass";
@Entity()
export class Lib_book extends BaseClass {
  @Column({ default: false, name: "isTaken" })
  @IsBoolean()
  isTaken: boolean;

  @ManyToOne(() => Lib_book_information, (info) => info.books, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  information: Lib_book_information;

  @OneToMany(() => Lib_borrowing, (borrow) => borrow.book, {
    onDelete: "CASCADE",
  })
  borrowings: Lib_borrowing[];
}
