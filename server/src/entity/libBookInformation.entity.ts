import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, TableForeignKey, OneToOne, JoinColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm"
import { Lib_publisher } from "./libPublisher.entity"
import { Lib_book } from "./libBook.entity"

@Entity()
export class Lib_book_information extends BaseEntity  {

    @PrimaryGeneratedColumn("uuid")
    id: number
    
    @Column({ nullable: true })
    name: string;
  
    is_available: boolean|undefined;
    
    @AfterLoad()
    setIsAvailable() {
        this.is_available =this.books?.some((book) => !book.is_taken);
    }
    @Column()
    publication_year: number
    @Column()
    author: string
    @Column()
    price: number
    @ManyToOne(() => Lib_publisher, (publisher) => publisher.information_books, { onDelete: "SET NULL",eager:true })
    publisher: Lib_publisher

    @OneToMany(() => Lib_book, (book) => book.information, { onDelete: "CASCADE" })
    books: Lib_book[]
    
  
}
