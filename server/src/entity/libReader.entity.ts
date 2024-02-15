import { IsDate, IsNotEmpty, IsString } from "class-validator";
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany
} from "typeorm";
import { BaseClass } from "./baseClass";
import { Lib_borrowing } from "./libBorrowing.entity";

@Entity()
export class Lib_reader extends BaseClass {
  @Column({ name: "first_name" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Column({ name: "last_name" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Column({ type: "date", nullable: true, name: "birth_date" })
  @IsDate()
  birthDate: Date;

  @OneToMany(() => Lib_borrowing, (borrow) => borrow.reader, {
    onDelete: "CASCADE",
  })
  borrowings: Lib_borrowing[];

  age?: number;

  @AfterLoad()
  setAge() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    this.age = age;
  }
}
