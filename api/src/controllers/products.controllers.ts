import { Request, Response } from "express";
import pool from "../postgres/connection";
import { generateRandomId } from "../utils/idGen";

export const getProducts = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

export const createNewProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, purchasePrice, publicPrice, quantity } = req.body;

  if (
    !name ||
    purchasePrice === undefined ||
    publicPrice === undefined ||
    quantity === undefined
  ) {
    return res.status(400).json({ error: "Full all missing data." });
  }

  const newId = generateRandomId();

  const query = `
   INSERT INTO products (id, name, purchase_price, public_price, quantity)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const values = [newId, name, purchasePrice, publicPrice, quantity];

  try {
    const result = await pool.query(query, values);
    const newProduct = result.rows[0];
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
