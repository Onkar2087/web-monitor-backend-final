import Database from "better-sqlite3";

const dbPath =
    process.env.NODE_ENV === "production"
        ? "/opt/render/project/data/database.db"
        : "database.db";

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

export default db;