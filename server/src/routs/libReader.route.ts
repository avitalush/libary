import express, { NextFunction, Request, Response } from "express";
import validate from "../helper/validate";
import { createReaderSchema } from "../schema/libReaderschema";
import ReaderService from "../services/libReader.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readers = await ReaderService.all();

    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/",
  validate(createReaderSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ReaderService.create(req.body);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.get(
  "/numborrowings/:readerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { readerId: reader } = req.params;

      const result = await ReaderService.getBorrowingsByReader(reader);

      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.delete(
  "/:readerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { readerId: reader } = req.params;

      const result = await ReaderService.deleteReaders(reader);

      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
module.exports = router;
