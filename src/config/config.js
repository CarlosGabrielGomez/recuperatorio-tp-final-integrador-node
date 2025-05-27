import Database from "better-sqlite3";

process.loadEnvFile();

const URI_DB = process.env.URI_DB;

const db = new Database(URI_DB);

console.log("Conectado correctamente a SQLite con better-sqlite3");

export { db };
