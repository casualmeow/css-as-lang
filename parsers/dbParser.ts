import type { Connection as MongooseConnection } from "mongoose";
import type { Pool as MySQLPool } from "mysql2/promise";
import type { Pool as PostgresPool } from "pg";
import type betterSqlite3 from "better-sqlite3";
import type { RedisClientType } from "redis";
type DenoKv = Deno.Kv;

export type DBConnection =
  | MongooseConnection
  | MySQLPool
  | PostgresPool
  | betterSqlite3.Database
  | RedisClientType
  | DenoKv
  | undefined;


export default async function dbParse(source: string) {
    const dbMatch = source.match(/@db\s*:?\s*["']?(\w+)["']?/);
    const db = dbMatch?.[1] ?? "";
    const portMatch = source.match(/@dbport\s+(\d+);/);
    let port = portMatch?.[1] ?? "";
  
    const log = (msg: string) => console.log(`[dbParse] ${msg}`);
  
    switch (db.toLowerCase()) { // refactor log to spinner msgs
      case "mongodb": {
        if (!port) port = "27017";
        log(`using port ${port}`);
  
        const mongoose = await import("mongoose");
        await mongoose.connect(`mongodb://localhost:${port}/my_database`);
        
        return mongoose.connection;
      }
  
      case "mysql":
      case "mariadb": {
        if (!port) port = "3306";
        log(`using MySQL/MariaDB at port ${port}`);
        const mysql2 = await import("mysql2");
        const connection = mysql2.createPool({
          host: "localhost",
          port: +port,
          user: "root",
          password: "root",
          database: "my_database",
        });
  
        await new Promise<void>((resolve, reject) => {
          connection.getConnection((err, conn) => {
            if (err) return reject(err);
            log("connected with MySQL/MariaDB");
            conn.release();
            resolve();
          });
        });
  
        return connection;
      }
  
      case "postgresql":
      case "postgres": {
        if (!port) port = "5432";
        log(`using PostgreSQL at port ${port}`);
  
        const { Pool } = await import("pg");
  
        const pool = new Pool({
          host: "localhost",
          port: +port,
          user: "postgres",
          password: "postgres",
          database: "my_database",
        });
        await pool.connect();
        log("connected with PostgreSQL!");
  
        return pool;
      }
      case "sqlite": {
        const dbFile = port || "my_database.sqlite";
        log(`using sqlite SQLite with port ${dbFile}`);
  
        const betterSqlite3 = await import("better-sqlite3"); // idk maybe refacttor to another lib
        const sqliteDb = new betterSqlite3.default(dbFile);
        return sqliteDb;
      }
      case "redis": {
        if (!port) port = "6379";
        log(`using Redis with port ${port}`);
        const redisPkg = await import("redis");
        const client = redisPkg.createClient({
          socket: { host: "localhost", port: +port }
        });
        await client.connect();
  
        log("connected to Redis");
        return client;
      }

      case "": {
        if (!port) port = "kv.db";
        log(`No database directive found. Using default Deno KV with file ${port}`);
        const kv = await Deno.openKv(port);
        return kv;
      }
      default: {
        log(`Unknown db: "${db}". Using Deno KV instead.`);
  
        if (!port) port = "kv.db";
        const kv = await Deno.openKv(port);
        return kv;
      }
    }
  }
  