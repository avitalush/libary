import express, { Request, Response ,NextFunction} from "express";

import validate from "../helper/validate";
import { createBorrowingSchema } from "../schema/libBorrowing.schema";
import { updateDate,all,create, checkOverdueReturns, getTopTenBorrowedBooks } from "../services/libBorrowing.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response,next:NextFunction) => {
    try {
   
        const books = await all();
  
        res.status(200).json(books);
    } catch (error) {
        
        res.status(500).json({ error: "Internal Server Error" });
    }
  });


router.post("/", validate(createBorrowingSchema), async (req: Request, res: Response,next:NextFunction) => {
    try {

  
       
        await create(req.body);
  
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.put('/return/:borrowingId', async (req: Request, res: Response,next:NextFunction) => {
    try {
  
        const borrowingId = req.params.borrowingId;

        await updateDate(borrowingId);
  
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/overtwoweeks", async (req: Request, res: Response,next:NextFunction) => {
    try {
  
       
       const result= await checkOverdueReturns();
  
   res.status(200).json({
            message: "Overdue returns checked successfully",
            overdueBorrowings: result,
        }); 
    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });
    }
  });
router.get("/topborrowedbooks", async (req: Request, res: Response,next:NextFunction) => {
    try {
  
       
       const result= await getTopTenBorrowedBooks();
  
  res.status(200).json({
            message: "Top borrowed books retrieved successfully",
            topBorrowedBooks: result,
        });
    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
