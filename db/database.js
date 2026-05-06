import Database from "better-sqlite3";

const db = new Database("database.db");

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

export default db;
