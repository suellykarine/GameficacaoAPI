import { Request, Response } from "express";
import { getAdminMetrics } from "../services/adminService";

export const getMetrics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const metrics = await getAdminMetrics();
    return res.status(200).json(metrics);
  } catch (error) {
    console.error("Admin metrics error: ", error);
    return res.status(500).json({ message: "Erro ao obter métricas" });
  }
};
