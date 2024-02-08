import express from "express";
import { AppDataSource } from "./data-source";
import { Request } from "express-validator/src/base";



  // create express app
  const app = express();

  // Import the router using require
   const router_publisher = require("./routs/libPublisher.route");
const router_informaion = require("./routs/libBookInformation.route");
 const router_book = require("./routs/libBook.route");
 const router_reader = require("./routs/libReader.route");
 const router_borrowing = require("./routs/libBorrowing.route");
  const { PORT = 3000 } = process.env;

  const cors = require('cors');
  
  app.use(cors());



  app.use(express.json());
  AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));


 app.use("/publishers", router_publisher);
  
   app.use("/informations", router_informaion);

app.use("/books", router_book);

 app.use("/readers", router_reader);

   app.use("/borrowing", router_borrowing);


