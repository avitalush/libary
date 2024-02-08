import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, TableForeignKey, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, DeleteDateColumn } from "typeorm"
import { Lib_book } from "./libBook.entity"
import { Lib_reader } from "./libReader.entity"

@Entity()
export class Lib_borrowing extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: number
    @CreateDateColumn()
    borrow_date: Date

    @DeleteDateColumn({ nullable: true })
    return_date: Date

    @ManyToOne(() => Lib_book, (lib_book) => lib_book.borrowings, {
        eager: true,
        onDelete: "SET NULL",
      })
      @JoinColumn({ name: "book_id" })
      book_id: Lib_book;
      

    @ManyToOne(()=>Lib_reader,(lib_reader=>lib_reader.borrowings),{onDelete:'SET NULL',eager:true})
    @JoinColumn({ name: 'reader_id' })

    reader_id:Lib_reader

}
