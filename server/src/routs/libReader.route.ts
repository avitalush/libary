import express, { Request, Response ,NextFunction} from "express";
//import { LibReaderService } from "../services/lib_reader.service";
import { Lib_reader } from "../entity/libReader.entity";
import validate from "../helper/validate";
import { createReaderSchema } from "../schema/libReaderschema";
import { all, create, deleteReaders, getBorrowingsByReader } from "../services/libReader.service";


const router = express.Router();

router.get("/", async (req: Request, res: Response,next:NextFunction) => {
    try {
   
        const readers = await all();

        res.status(200).json(readers);
    } catch (error) {
        
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", validate(createReaderSchema), async (req: Request, res: Response,next:NextFunction) => {
    try {

       
        await create(req.body);

        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/numborrowings/:readerId" ,async (req: Request, res: Response,next:NextFunction) => {
    try {

       const reader=req.params.readerId;

       const result= await getBorrowingsByReader(reader);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/:readerId" ,async (req: Request, res: Response,next:NextFunction) => {
    try {

       const reader=req.params.readerId;

       const result= await deleteReaders(reader);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;
