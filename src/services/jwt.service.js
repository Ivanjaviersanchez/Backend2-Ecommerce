import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

// 🔥 Generar token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    SECRET,
    { expiresIn: "1h" }
  );
};

// 🔥 Verificar token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};