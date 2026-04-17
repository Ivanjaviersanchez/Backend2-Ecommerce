import { Router } from "express";
import { getAllProducts, getAllProductsAdmin, createNewProduct, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { jwtAuth } from "../middlewares/jwt.middleware.js";

const router = Router();

//  SESSION 

router.get("/", authMiddleware, getAllProducts);
router.get("/all",
  authMiddleware,
  authorizeRole(["admin"]),
  getAllProductsAdmin
);
router.post("/", authMiddleware, createNewProduct);
router.put("/:id", authMiddleware, updateProductController);
router.delete("/:id", authMiddleware, deleteProductController);

//  JWT TOKEN

// GET productos del usuario
router.get("/jwt", jwtAuth, getAllProducts);

// GET admin (todos)
router.get("/jwt/all",
  jwtAuth,
  authorizeRole(["admin"]),
  getAllProductsAdmin
);

// CREATE
router.post("/jwt",
  jwtAuth,
  createNewProduct
);

// UPDATE
router.put("/jwt/:id",
  jwtAuth,
  updateProductController
);

// DELETE
router.delete("/jwt/:id",
  jwtAuth,
  deleteProductController
);

export default router;