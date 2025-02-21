"use strict";
// src/services/adminService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminMetrics = void 0;
const prismaClient_ts_1 = __importDefault(require("../prismaClient.ts"));
/**
 * Retorna métricas de engajamento:
 * - Total de usuários
 * - Média do streak
 * - Ranking dos usuários (top 10 por streak)
 */
const getAdminMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield prismaClient_ts_1.default.user.count();
    const users = yield prismaClient_ts_1.default.user.findMany();
    const averageStreak = users.length > 0
        ? users.reduce((acc, user) => acc + user.streak, 0) / users.length
        : 0;
    const ranking = yield prismaClient_ts_1.default.user.findMany({
        orderBy: { streak: "desc" },
        take: 10,
    });
    return { totalUsers, averageStreak, ranking };
});
exports.getAdminMetrics = getAdminMetrics;
