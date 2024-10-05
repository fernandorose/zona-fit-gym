import express from "express";
import * as productsControllers from "../controllers/products.controllers";

const router = express.Router();

router
  .get("/products", productsControllers.getProducts)
  .post("/products/create", productsControllers.createNewProduct);

export default router;
