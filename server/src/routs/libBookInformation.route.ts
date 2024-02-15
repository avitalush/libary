import express, { NextFunction, Request, Response } from "express";
import validate from "../helper/validate";
import { createBookInformationSchema } from "../schema/libBookInformation.schema";
import BookService from "../services/libBook.service";
import InformationService from "../services/libBookInformation.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const informations = await InformationService.all();

    res.status(200).json(informations);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/createbooks",
  validate(createBookInformationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book, copiesNumber } = req.body;

      await InformationService.createBookWithCopies(book, copiesNumber);

      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/addcopies",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idBook, copiesNumber } = req.body;

      const result = await BookService.addCopies(idBook, copiesNumber);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  "/:infoId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await InformationService.deleteInfo(req.params.infoId);

      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
module.exports = router;
