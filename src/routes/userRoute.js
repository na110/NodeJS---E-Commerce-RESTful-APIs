import express from "express";
import { logIn, register } from "../services/userService.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await register({ firstName, lastName, email, password });
  res.status(result.status).json(result);
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await logIn({ email, password });

  res.status(result.status).json(result);
});

export default router;
