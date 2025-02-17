// src/services/userService.ts

import { User } from "@prisma/client";
import prisma from "../prismaClient.ts";

/**
 * Processa os dados do webhook: registra uma nova leitura e atualiza o streak do usuário.
 */
export const processWebhookForUser = async (params: {
  email: string;
  resourceId?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_channel?: string;
}): Promise<User> => {
  const {
    email,
    resourceId,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_channel,
  } = params;

  // Verifica se o usuário existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Registrar o evento de abertura (leitura)
  await prisma.reading.create({
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
    } else if (diffDays > 1) {
      // Se houver mais de 1 dia de intervalo, resetar o streak
      newStreak = 1;
    }
  }

  // Atualiza o usuário com o novo streak
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      streak: newStreak,
      lastLogin: today, // Atualiza o campo de último login
    },
    include: { readings: true }, // Retorna as leituras associadas ao usuário
  });

  return updatedUser;
};

/**
 * Obtém as informações de um usuário, incluindo suas leituras
 */
export const getUserInfo = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      readings: true, // Inclui as leituras do usuário
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Obtém as métricas gerais de engajamento
 */
export const getEngagementMetrics = async () => {
  const totalUsers = await prisma.user.count(); // Contagem de usuários
  const totalReadings = await prisma.reading.count(); // Contagem de leituras

  // Métricas adicionais podem ser calculadas aqui

  return {
    totalUsers,
    totalReadings,
  };
};

/**
 * Obtém o ranking de leitores mais engajados
 */
export const getEngagedUsersRanking = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      streak: "desc", // Ordena pela quantidade de streak
    },
    take: 10, // Retorna os 10 principais
  });

  return users;
};
