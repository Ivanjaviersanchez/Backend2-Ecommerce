import Product from "../models/product.model.js";

// 📦 GET (usuario)
export const getProducts = async (user) => {
  return await Product.find({ owner: user.id })
    .populate("owner", "email username");
};

// 📦 GET (admin con relaciones)
export const getAllProductsWithOwner = async () => {
  return await Product.find()
    .populate("owner", "email username");
};

// ➕ CREATE
export const createProduct = async (data, user) => {
  return await Product.create({
    ...data,
    owner: user.id
  });
};

// ✏️ UPDATE
export const updateProduct = async (id, data, user) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Producto no encontrado");

  if (user.role !== "admin") {
    if (product.owner.toString() !== user.id) {
      throw new Error("No autorizado");
    }
  }

  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// ❌ DELETE
export const deleteProduct = async (id, user) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Producto no encontrado");

  if (user.role !== "admin") {
    if (product.owner.toString() !== user.id) {
      throw new Error("No autorizado");
    }
  }

  await Product.findByIdAndDelete(id);

  return { message: "Producto eliminado" };
};