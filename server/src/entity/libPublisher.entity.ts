import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Lib_book_information } from "./libBookInformation.entity";
import { IsEmail } from "class-validator";
import { BaseClass } from "./baseClass";

@Entity()
export class Lib_publisher extends BaseClass {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Lib_book_information, (info) => info.publisher, {
    cascade: true,
    nullable: true,
  })
  information_books: Lib_book_information[];
}
