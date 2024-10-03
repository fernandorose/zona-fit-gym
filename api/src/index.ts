import express from "express";
import pool from "./postgres/connection";

import ProductsRouter from "./routes/products.route";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", ProductsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

const dbtest = async () => {
  const client = await pool.connect();
  try {
    console.log("Postgres db connected");
    client.release();
  } catch (error) {
    console.log("Postgres db error");
  }
};

dbtest();
