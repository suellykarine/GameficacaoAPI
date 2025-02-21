import { Router } from "express";
import { getMetrics } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/metrics", getMetrics);

export { adminRouter };
