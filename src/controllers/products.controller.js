import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsWithOwner
} from "../services/products.service.js";

//  UNIFICA SESION + JWT
const getUserFromRequest = (req) => {
  return req.session?.user || req.user;
};

// GET (usuario)
export const getAllProducts = async (req, res) => {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const products = await getProducts(user);
    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET (admin)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const products = await getAllProductsWithOwner();
    res.json(products);
  } catch (error) {
    console.error("GET ADMIN PRODUCTS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE
export const createNewProduct = async (req, res) => {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const product = await createProduct(req.body, user);
    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateProductController = async (req, res) => {
  try {
    const user = getUserFromRequest(req);

    const updated = await updateProduct(
      req.params.id,
      req.body,
      user
    );

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteProductController = async (req, res) => {
  try {
    const user = getUserFromRequest(req);

    const result = await deleteProduct(
      req.params.id,
      user
    );

    res.json(result);
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(400).json({ error: error.message });
  }
};