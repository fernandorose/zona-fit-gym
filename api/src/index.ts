import express from "express";
import pool from "./postgres/connection";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
