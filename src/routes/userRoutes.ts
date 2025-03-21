import { Router } from "express";
import { loginUser } from "../controllers/loginController";
import {
  getEngagedUsersRankingController,
  getEngagementMetricsController,
  getUserStatistics,
  handleWebhook,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/webhook", handleWebhook);

userRouter.get("/user/statistics", getUserStatistics);

userRouter.get("/engagement/metrics", getEngagementMetricsController);

userRouter.get("/engagement/ranking", getEngagedUsersRankingController);

userRouter.post("/login", loginUser);

export { userRouter };
