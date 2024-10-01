import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "zonafit",
  password: DB_PASSWORD,
  port: 5432,
});

export default pool;
