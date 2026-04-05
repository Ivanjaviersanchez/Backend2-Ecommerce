import { Router } from "express";
import { getAllProducts, createNewProduct } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAllProducts);
router.post("/", authMiddleware, createNewProduct);

export default router;