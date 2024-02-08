import { DataSource } from "typeorm"
import { Lib_publisher } from "./entity/libPublisher.entity";
import { Lib_book } from "./entity/libBook.entity";
import { Lib_book_information } from "./entity/libBookInformation.entity";
import { Lib_borrowing } from "./entity/libBorrowing.entity";
import { Lib_reader } from "./entity/libReader.entity";


export const AppDataSource=new DataSource({
        type:"postgres",
        host:"localhost",
        port:5432,
        username:"postgres",
        password:"1234",
        database:"Libary_DB",
        entities: [Lib_publisher,Lib_book,Lib_book_information,Lib_borrowing,Lib_reader],
        synchronize: true,
        logging:true
    })

