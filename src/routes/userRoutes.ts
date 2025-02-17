import { Router } from "express";
import {
  getEngagedUsersRankingController,
  getEngagementMetricsController,
  getUserStatistics,
  handleWebhook,
} from "../controllers/userController";

const userRouter = Router();

// Rota para processar o webhook com dados de aberturas de newsletters
userRouter.post("/webhook", handleWebhook);

// Rota para obter as estatísticas de um usuário
userRouter.get("/user/:email/statistics", getUserStatistics);

// Rota para obter as métricas de engajamento geral
userRouter.get("/engagement/metrics", getEngagementMetricsController);

// Rota para obter o ranking de leitores engajados
userRouter.get("/engagement/ranking", getEngagedUsersRankingController);

export { userRouter };
