// src/services/adminService.ts

import { User } from "@prisma/client";
import prisma from "../prismaClient.ts";

/**
 * Retorna métricas de engajamento:
 * - Total de usuários
 * - Média do streak
 * - Ranking dos usuários (top 10 por streak)
 */
export const getAdminMetrics = async (): Promise<{
  totalUsers: number;
  averageStreak: number;
  ranking: User[];
}> => {
  const totalUsers = await prisma.user.count();
  const users = await prisma.user.findMany();
  const averageStreak =
    users.length > 0
      ? users.reduce((acc, user) => acc + user.streak, 0) / users.length
      : 0;
  const ranking = await prisma.user.findMany({
    orderBy: { streak: "desc" },
    take: 10,
  });

  return { totalUsers, averageStreak, ranking };
};
