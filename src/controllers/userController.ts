// src/controllers/userController.ts
import { Request, Response } from "express";
import {
  getEngagedUsersRanking,
  getEngagementMetrics,
  getUserInfo,
  processWebhookForUser,
} from "../services/userServices";

/**
 * Processa o webhook para o usuário, registrando a leitura e atualizando o streak.
 */
export const handleWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    email,
    resourceId,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_channel,
  } = req.body;

  try {
    // Chama o serviço para processar a leitura do usuário
    const user = await processWebhookForUser({
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
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return res.status(500).json({ message: "Erro ao processar o webhook" });
  }
};

/**
 * Recupera as informações do usuário (streak, histórico de aberturas).
 */
export const getUserStatistics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.params;

  try {
    // Chama o serviço para obter as informações do usuário
    const user = await getUserInfo(email);

    return res.status(200).json({
      message: "Informações do usuário recuperadas com sucesso.",
      user,
    });
  } catch (error) {
    console.error("Erro ao obter as informações do usuário:", error);
    return res
      .status(500)
      .json({ message: "Erro ao obter as informações do usuário" });
  }
};

/**
 * Recupera as métricas gerais de engajamento (total de usuários e leituras).
 */
export const getEngagementMetricsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Chama o serviço para obter as métricas de engajamento
    const metrics = await getEngagementMetrics();

    return res.status(200).json({
      message: "Métricas de engajamento recuperadas com sucesso.",
      metrics,
    });
  } catch (error) {
    console.error("Erro ao obter as métricas de engajamento:", error);
    return res
      .status(500)
      .json({ message: "Erro ao obter as métricas de engajamento" });
  }
};

/**
 * Recupera o ranking dos leitores mais engajados (maior streak).
 */
export const getEngagedUsersRankingController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Chama o serviço para obter o ranking de usuários engajados
    const ranking = await getEngagedUsersRanking();

    return res.status(200).json({
      message: "Ranking de leitores engajados recuperado com sucesso.",
      ranking,
    });
  } catch (error) {
    console.error("Erro ao obter o ranking dos leitores:", error);
    return res
      .status(500)
      .json({ message: "Erro ao obter o ranking dos leitores" });
  }
};
