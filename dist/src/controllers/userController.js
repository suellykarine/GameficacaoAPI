"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEngagedUsersRankingController = exports.getEngagementMetricsController = exports.getUserStatistics = exports.handleWebhook = void 0;
const userServices_1 = require("../services/userServices");
/**
 * Processa o webhook para o usuário, registrando a leitura e atualizando o streak.
 */
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, resourceId, utm_source, utm_medium, utm_campaign, utm_channel, } = req.body;
    try {
        // Chama o serviço para processar a leitura do usuário
        const user = yield (0, userServices_1.processWebhookForUser)({
            email,
            resourceId,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_channel,
        });
        // Retorna as informações do usuário atualizadas
        return res.status(200).json({
            message: "Webhook processado com sucesso!",
            user,
        });
    }
    catch (error) {
        console.error("Erro ao processar o webhook:", error);
        return res.status(500).json({ message: "Erro ao processar o webhook" });
    }
});
exports.handleWebhook = handleWebhook;
/**
 * Recupera as informações do usuário (streak, histórico de aberturas).
 */
const getUserStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        // Chama o serviço para obter as informações do usuário
        const user = yield (0, userServices_1.getUserInfo)(email);
        return res.status(200).json({
            message: "Informações do usuário recuperadas com sucesso.",
            user,
        });
    }
    catch (error) {
        console.error("Erro ao obter as informações do usuário:", error);
        return res
            .status(500)
            .json({ message: "Erro ao obter as informações do usuário" });
    }
});
exports.getUserStatistics = getUserStatistics;
/**
 * Recupera as métricas gerais de engajamento (total de usuários e leituras).
 */
const getEngagementMetricsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Chama o serviço para obter as métricas de engajamento
        const metrics = yield (0, userServices_1.getEngagementMetrics)();
        return res.status(200).json({
            message: "Métricas de engajamento recuperadas com sucesso.",
            metrics,
        });
    }
    catch (error) {
        console.error("Erro ao obter as métricas de engajamento:", error);
        return res
            .status(500)
            .json({ message: "Erro ao obter as métricas de engajamento" });
    }
});
exports.getEngagementMetricsController = getEngagementMetricsController;
/**
 * Recupera o ranking dos leitores mais engajados (maior streak).
 */
const getEngagedUsersRankingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Chama o serviço para obter o ranking de usuários engajados
        const ranking = yield (0, userServices_1.getEngagedUsersRanking)();
        return res.status(200).json({
            message: "Ranking de leitores engajados recuperado com sucesso.",
            ranking,
        });
    }
    catch (error) {
        console.error("Erro ao obter o ranking dos leitores:", error);
        return res
            .status(500)
            .json({ message: "Erro ao obter o ranking dos leitores" });
    }
});
exports.getEngagedUsersRankingController = getEngagedUsersRankingController;
