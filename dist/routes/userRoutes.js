"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Certifique-se de que o caminho está correto
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// Aqui, o loginUser deve ser compatível com o tipo da rota
userRouter.post("/login", (req, res) => {
    (0, userController_1.loginUser)(req, res); // Explicitamente passando os tipos
});
