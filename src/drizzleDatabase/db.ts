import sqlite3 from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "./db.sqlite");

const db = new sqlite3(dbPath);

const drizzleInstance = drizzle(db);

export { drizzleInstance };
