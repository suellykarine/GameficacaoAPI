"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm"); // Importando sql para executar consultas
const express_1 = __importDefault(require("express")); // Importando o Express
const db_1 = require("./drizzleDatabase/db"); // Importando a instância do Drizzle ORM
const adminRoutes_1 = require("./routes/adminRoutes"); // Importando o roteador de admin
const userRoutes_1 = require("./routes/userRoutes"); // Importando o roteador de usuários
const app = (0, express_1.default)();
// Middleware para processar o corpo das requisições em JSON
app.use(express_1.default.json());
// Registrando os roteadores
app.use("/api/users", userRoutes_1.userRouter);
app.use("/api/admin", adminRoutes_1.adminRouter);
// Verificando a conexão com o banco de dados
db_1.drizzleInstance
    .execute((0, drizzle_orm_1.sql) `SELECT 1`) // Executa uma consulta simples para verificar a conexão
    .then(() => {
    console.log("Database connected successfully!");
})
    .catch((error) => {
    console.error("Database connection failed:", error);
});
// Iniciando o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
