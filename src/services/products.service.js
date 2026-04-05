import Product from "../models/product.model.js";

// 📦 GET ALL
export const getProducts = async (user) => {
  return await Product.find({ owner: user.id });
};

// ➕ CREATE
export const createProduct = async (data, user) => {
  return await Product.create({
    ...data,
    owner: user.id
  });
};