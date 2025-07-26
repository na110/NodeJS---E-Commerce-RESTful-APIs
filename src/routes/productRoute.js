import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/productService.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const result = await getAllProducts();
  res.status(result.status).json(result);
});

// POST new product
router.post("/", async (req, res) => {
  const { name, price, category, stock } = req.body;
  const result = await addNewProduct({ name, price, category, stock });
  res.status(result.status).json(result);
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteProduct(id);
  res.status(result.status).json(result);
});

// PUT update product by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await updateProduct({ id, body });
  res.status(result.status).json(result);
});

export default router;
