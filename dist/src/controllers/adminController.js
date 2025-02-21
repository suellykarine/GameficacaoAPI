"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = void 0;
const adminServices_1 = require("../services/adminServices");
/**
 * Controller para retornar métricas administrativas e ranking dos usuários.
 */
const getMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metrics = yield (0, adminServices_1.getAdminMetrics)();
        return res.status(200).json(metrics);
    }
    catch (error) {
        console.error("Admin metrics error: ", error);
        return res.status(500).json({ message: "Erro ao obter métricas" });
    }
});
exports.getMetrics = getMetrics;
