"use strict";
// import { Router } from "express";
// import prisma from "../prismaClient.ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
// const adminRouter = Router();
// // Rota para obter métricas de engajamento
// adminRouter.get("/metrics", async (req, res) => {
//   try {
//     // Total de usuários
//     const totalUsers = await prisma.user.count();
//     // Média do streak (supondo que totalUsers > 0)
//     const users = await prisma.user.findMany();
//     const averageStreak =
//       users.length > 0
//         ? users.reduce((acc, user) => acc + user.streak, 0) / users.length
//         : 0;
//     // Ranking dos usuários por streak (ordenado de forma decrescente)
//     const ranking = await prisma.user.findMany({
//       orderBy: { streak: "desc" },
//       take: 10,
//     });
//     return res.status(200).json({
//       totalUsers,
//       averageStreak,
//       ranking,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Erro ao obter métricas" });
//   }
// });
// export { adminRouter };
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
// Rota para obter métricas de engajamento e ranking dos usuários
adminRouter.get("/metrics", adminController_1.getMetrics);
