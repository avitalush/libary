import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany, Column } from "typeorm";
import { Lib_book_information } from "./libBookInformation.entity";
import { Lib_reader } from "./libReader.entity";
import { Lib_borrowing } from "./libBorrowing.entity";

@Entity()
export class Lib_book extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ default: false })
    is_taken: boolean

    @ManyToOne(() => Lib_book_information, (info) => info.books, { onDelete: "CASCADE", eager: true })
     information: Lib_book_information;

     @OneToMany(() =>  Lib_borrowing, (borrow) => borrow.book_id, { onDelete: "CASCADE" })
     borrowings: Lib_borrowing[]
 }

