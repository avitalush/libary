import express, { Request, Response,NextFunction } from "express";
import validate from "../helper/validate";
import { createBookInformationSchema } from "../schema/libBookInformation.schema";
import { all, createBookWithCopies } from "../services/libBookInformation.service";
import { addCopies } from "../services/libBook.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response,next:NextFunction) => {
    try {
   
        const informations = await all();
  
        res.status(200).json(informations);
    } catch (error) {
        
        next(error)
    }
  });

router.post("/createbooks",validate(createBookInformationSchema), async (req: Request, res: Response,next:NextFunction) => {
    try {

  
        const { book, copiesNumber } = req.body;

        const result = await createBookWithCopies(book, copiesNumber);
  
        res.status(200).json({ message: "success" });
    } catch (error) {
        next(error)
    }
  });

router.post("/addcopies",async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idBook, copiesNumber } = req.body;
        
        const result = await addCopies(idBook, copiesNumber);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
