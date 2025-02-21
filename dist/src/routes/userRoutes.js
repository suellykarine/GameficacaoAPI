"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// Rota para processar o webhook com dados de aberturas de newsletters
userRouter.post("/webhook", userController_1.handleWebhook);
// Rota para obter as estatísticas de um usuário
userRouter.get("/user/:email/statistics", userController_1.getUserStatistics);
// Rota para obter as métricas de engajamento geral
userRouter.get("/engagement/metrics", userController_1.getEngagementMetricsController);
// Rota para obter o ranking de leitores engajados
userRouter.get("/engagement/ranking", userController_1.getEngagedUsersRankingController);
