
import express, { Request, Response ,NextFunction} from "express";
import { Lib_publisher } from "../entity/libPublisher.entity";
import validate from "../helper/validate";
import { createPublisherSchema } from "../schema/libPublisher.schema";
import { all, create, getReportData } from "../services/libPublisher.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response,next:NextFunction) => {
  try {
 
      const publishers = await all();

      res.status(200).json(publishers);
  } catch (error) {
      
      res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/", validate(createPublisherSchema), async (req: Request, res: Response,next:NextFunction) => {
  try {

     
      await create(req.body);

      res.status(200).json({ message: "success" });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/reportdata", async (req: Request, res: Response,next:NextFunction) => {
  try {

     
   const result=   await getReportData();

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  await Lib_publisher.delete(req.params.id);

  res.json({
    message: "Record deleted successfully."
  });
});

module.exports = router;
