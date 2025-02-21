"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readings = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
// Definição da tabela de usuários
exports.users = (0, sqlite_core_1.sqliteTable)("users", {
    id: (0, sqlite_core_1.integer)("id").primaryKey({ autoIncrement: true }),
    email: (0, sqlite_core_1.text)("email").unique().notNull(),
    streak: (0, sqlite_core_1.integer)("streak").notNull().default(0),
    lastLogin: (0, sqlite_core_1.integer)("last_login", { mode: "timestamp" }).notNull(),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" }).default((0, drizzle_orm_1.sql) `(cast((julianday('now') - 2440587.5) * 86400000 as integer))`),
});
// Definição da tabela de leituras
exports.readings = (0, sqlite_core_1.sqliteTable)("readings", {
    id: (0, sqlite_core_1.integer)("id").primaryKey({ autoIncrement: true }),
    resourceId: (0, sqlite_core_1.text)("resource_id"),
    utmSource: (0, sqlite_core_1.text)("utm_source"),
    utmMedium: (0, sqlite_core_1.text)("utm_medium"),
    utmCampaign: (0, sqlite_core_1.text)("utm_campaign"),
    utmChannel: (0, sqlite_core_1.text)("utm_channel"),
    openedAt: (0, sqlite_core_1.integer)("opened_at", { mode: "timestamp" }).default((0, drizzle_orm_1.sql) `(cast((julianday('now') - 2440587.5) * 86400000 as integer))`),
    userId: (0, sqlite_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.users.id),
});
