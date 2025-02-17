"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser")); // Middleware para processar o corpo da requisição
const express_1 = __importDefault(require("express")); // Importando o Express
const userRoutes_1 = require("./routes/userRoutes"); // Importando o roteador
const app = (0, express_1.default)();
// Usando o middleware para processar o corpo das requisições em JSON
app.use(body_parser_1.default.json());
// Registrando o roteador de usuários
app.use("/api/users", userRoutes_1.userRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
