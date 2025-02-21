import { Request, Response } from "express";
import {
  getEngagedUsersRanking,
  getEngagementMetrics,
  getUserInfo,
  processWebhookForUser,
} from "../services/userService";

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
    const user = await processWebhookForUser({
      email,
      resourceId,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_channel,
    });

    return res.status(200).json({
      message: "Webhook processado com sucesso!",
      user,
    });
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return res.status(500).json({ message: "Erro ao processar o webhook" });
  }
};

export const getUserStatistics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  try {
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

export const getEngagementMetricsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
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

export const getEngagedUsersRankingController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
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
