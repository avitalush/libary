import express, { Request, Response,NextFunction } from "express";
import { all,  getBooksByInformation } from "../services/libBook.service";

const router = express.Router();

router.get("/byinformation/:infoid",async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info=req.params.infoid;

        const result = await getBooksByInformation(info);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
