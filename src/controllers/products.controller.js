import { getProducts, createProduct } from "../services/products.service.js";

// 📦 GET
export const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts(req.session.user);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// ➕ POST
export const createNewProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body, req.session.user);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};