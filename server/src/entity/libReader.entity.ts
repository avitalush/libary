import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, AfterLoad } from "typeorm";
import { Lib_borrowing } from "./libBorrowing.entity";

@Entity()
export class Lib_reader extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: "date", nullable: true })
  birth_date: Date;

  @OneToMany(() => Lib_borrowing, (borrow) => borrow.reader_id, {
    onDelete: "CASCADE",
  })
  borrowings: Lib_borrowing[];

  @Column({ select: false, nullable: true, insert: false, update: false })
  age: number | undefined;

  @AfterLoad()
  @AfterLoad()
  setAge() {
    let age = new Date().getFullYear() - new Date(this.birth_date).getFullYear(); 
    this.age=(new Date().getMonth() <  new Date(this.birth_date).getMonth() ||
    (new Date().getMonth() === new Date(this.birth_date).getMonth() && new Date().getDate() < new Date(this.birth_date).getDate())) ? age - 1 : age;
  }
}
