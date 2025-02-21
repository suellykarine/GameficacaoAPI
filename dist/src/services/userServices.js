"use strict";
// src/services/userService.ts
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
exports.getEngagedUsersRanking = exports.getEngagementMetrics = exports.getUserInfo = exports.processWebhookForUser = void 0;
const prismaClient_ts_1 = __importDefault(require("../prismaClient.ts"));
/**
 * Processa os dados do webhook: registra uma nova leitura e atualiza o streak do usuário.
 */
const processWebhookForUser = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, resourceId, utm_source, utm_medium, utm_campaign, utm_channel, } = params;
    // Verifica se o usuário existe
    const user = yield prismaClient_ts_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    // Registrar o evento de abertura (leitura)
    yield prismaClient_ts_1.default.reading.create({
        data: {
            resourceId: resourceId || null,
            utmSource: utm_source || null,
            utmMedium: utm_medium || null,
            utmCampaign: utm_campaign || null,
            utmChannel: utm_channel || null,
            user: { connect: { id: user.id } },
        },
    });
    // Lógica para atualizar o streak
    const lastLogin = new Date(user.lastLogin); // Último login do usuário
    const today = new Date(); // Data de hoje
    const todayDay = today.getDay(); // 0 = domingo, 1 = segunda-feira, etc.
    let newStreak = user.streak;
    // Verifica se o dia atual é domingo, se for, não deve atualizar o streak
    if (todayDay !== 0) {
        const diffTime = today.getTime() - lastLogin.getTime(); // Diferença entre os dias em milissegundos
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Converte para dias
        if (diffDays === 1) {
            // Aumenta o streak se for um dia consecutivo
            newStreak = user.streak + 1;
        }
        else if (diffDays > 1) {
            // Se houver mais de 1 dia de intervalo, resetar o streak
            newStreak = 1;
        }
    }
    // Atualiza o usuário com o novo streak
    const updatedUser = yield prismaClient_ts_1.default.user.update({
        where: { email },
        data: {
            streak: newStreak,
            lastLogin: today, // Atualiza o campo de último login
        },
        include: { readings: true }, // Retorna as leituras associadas ao usuário
    });
    return updatedUser;
});
exports.processWebhookForUser = processWebhookForUser;
/**
 * Obtém as informações de um usuário, incluindo suas leituras
 */
const getUserInfo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_ts_1.default.user.findUnique({
        where: { email },
        include: {
            readings: true, // Inclui as leituras do usuário
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.getUserInfo = getUserInfo;
/**
 * Obtém as métricas gerais de engajamento
 */
const getEngagementMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield prismaClient_ts_1.default.user.count(); // Contagem de usuários
    const totalReadings = yield prismaClient_ts_1.default.reading.count(); // Contagem de leituras
    // Métricas adicionais podem ser calculadas aqui
    return {
        totalUsers,
        totalReadings,
    };
});
exports.getEngagementMetrics = getEngagementMetrics;
/**
 * Obtém o ranking de leitores mais engajados
 */
const getEngagedUsersRanking = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_ts_1.default.user.findMany({
        orderBy: {
            streak: "desc", // Ordena pela quantidade de streak
        },
        take: 10, // Retorna os 10 principais
    });
    return users;
});
exports.getEngagedUsersRanking = getEngagedUsersRanking;
