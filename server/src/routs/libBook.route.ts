import express, { NextFunction, Request, Response } from "express";
import BookService from "../services/libBook.service";

const router = express.Router();

router.get(
  "/byinformation/:infoid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { infoid: info } = req.params;

      const result = await BookService.getBooksByInformation(info);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
