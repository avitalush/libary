import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Lib_book_information } from "./libBookInformation.entity";

@Entity()
export class Lib_publisher extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;
    @Column()
    email:string

    @OneToMany(() => Lib_book_information, (info) => info.publisher, { cascade: true,nullable:true })
    information_books: Lib_book_information[]
}
