"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const loginUser = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email é obrigatório" });
    }
    return res
        .status(200)
        .json({ message: `Usuário ${email} logado com sucesso` });
};
exports.loginUser = loginUser;
