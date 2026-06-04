import { Router, type IRouter } from "express";
import careerRouter from "./career";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(careerRouter);

export default router;
