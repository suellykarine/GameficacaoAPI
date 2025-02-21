import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  streak: integer("streak").notNull().default(0),
  lastLogin: integer("last_login", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(cast((julianday('now') - 2440587.5) * 86400000 as integer))`
  ),
});

export const readings = sqliteTable("readings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  resourceId: text("resource_id"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmChannel: text("utm_channel"),
  openedAt: integer("opened_at", { mode: "timestamp" }).default(
    sql`(cast((julianday('now') - 2440587.5) * 86400000 as integer))`
  ),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});
