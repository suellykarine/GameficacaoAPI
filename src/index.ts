import { PrismaClient } from "@prisma/client"; // Importando o PrismaClient
import express from "express"; // Importando o Express
import { adminRouter } from "./routes/adminRoutes";
import { userRouter } from "./routes/userRoutes"; // Importando o roteador

const app = express();
const prisma = new PrismaClient(); // Inicializando o Prisma Client

// Usando o middleware para processar o corpo das requisições em JSON
app.use(express.json());

// Registrando o roteador de usuários
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

// Conectando ao banco de dados usando o Prisma
prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
