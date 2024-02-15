import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  BaseEntity,
  AfterLoad,
  DeleteDateColumn,
} from "typeorm";
import { Lib_publisher } from "./libPublisher.entity";
import { Lib_book } from "./libBook.entity";
import { IsString, IsBoolean, IsDate, IsNumber } from "class-validator";
import { BaseClass } from "./baseClass";

@Entity()
export class Lib_book_information extends BaseClass {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsBoolean()
  isAvailable?: boolean;

  @AfterLoad()
  setIsAvailable() {
    this.isAvailable = this.books?.some((book) => !book.isTaken);
  }

  @Column({ name: "publication_year", nullable: true })
  @IsDate()
  publicationYear: Date;

  @Column()
  @IsString()
  author: string;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne(() => Lib_publisher, (publisher) => publisher.information_books, {
    onDelete: "SET NULL",
    eager: true,
  })
  publisher: Lib_publisher;

  @OneToMany(() => Lib_book, (book) => book.information, {
    onDelete: "CASCADE",
  })
  books: Lib_book[];
}
