import express, { Request, Response, NextFunction } from "express";
import validate from "../helper/validate";
import { createBorrowingSchema } from "../schema/libBorrowing.schema";
import BorrowingService from "../services/libBorrowing.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BorrowingService.all();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/",
  validate(createBorrowingSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("create");
      
      await BorrowingService.create(req.body);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.put(
  "/return/:borrowingId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { borrowingId: borrow } = req.params;

      await BorrowingService.updateDate(borrow);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.get(
  "/overtwoweeks",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BorrowingService.checkOverdueReturns();

      res.status(200).json({
        message: "Overdue returns checked successfully",
        overdueBorrowings: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.get(
  "/topborrowedbooks",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BorrowingService.getTopTenBorrowedBooks();

      res.status(200).json({
        message: "Top borrowed books retrieved successfully",
        topBorrowedBooks: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

module.exports = router;
