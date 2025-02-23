import { Request, Response } from "express";
import { drizzleInstance } from "../drizzleDatabase/db";

import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  try {
    const user = await drizzleInstance
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (error) {
    console.error("Erro ao processar login:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
