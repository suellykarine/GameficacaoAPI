"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drizzleInstance = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3")); // Usando better-sqlite3 para SQLite
const sqlite_1 = require("drizzle-orm/sqlite"); // Importando o Drizzle ORM para SQLite
const path_1 = __importDefault(require("path"));
// Caminho para o banco de dados SQLite
const dbPath = path_1.default.resolve(__dirname, "./db.sqlite");
// Criando uma instância do banco de dados SQLite
const db = new better_sqlite3_1.default(dbPath);
// Configuração do Drizzle ORM
const drizzleInstance = (0, sqlite_1.drizzle)(db);
exports.drizzleInstance = drizzleInstance;
