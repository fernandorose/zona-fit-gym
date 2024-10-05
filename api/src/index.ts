import express from "express";
import pool from "./postgres/connection";

import ProductsRoutes from "./routes/products.routes";
import MembershipsRoutes from "./routes/memberships.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", ProductsRoutes);
app.use("/api", MembershipsRoutes);

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
