import express, { NextFunction, Request, Response } from "express";
import validate from "../helper/validate";
import { createPublisherSchema } from "../schema/libPublisher.schema";
import PublisherService from "../services/libPublisher.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publishers = await PublisherService.all();

    res.status(200).json(publishers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post(
  "/",
  validate(createPublisherSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PublisherService.create(req.body);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.get(
  "/reportdata",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await PublisherService.getReportData();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.delete("/:publisherId", async (req: Request, res: Response) => {
  try {
    const result = await PublisherService.delete(req.params.publisherId);

    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
