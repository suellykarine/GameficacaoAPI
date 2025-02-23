import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";
import { drizzleInstance } from "../drizzleDatabase/db";

export const loginUser = async (email: string) => {
  const user = await drizzleInstance
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};
