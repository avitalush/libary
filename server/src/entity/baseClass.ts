import { IsBoolean } from "class-validator";
import {
  AfterLoad,
  BaseEntity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class BaseClass extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @DeleteDateColumn({ nullable: true })
  @IsBoolean()
  isDeleted: boolean;
}
