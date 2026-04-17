import { verifyToken } from "../services/jwt.service.js";

export const jwtAuth = (req, res, next) => {
  try {
    let token;

    // 🔹 1. Intentar desde HEADER
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 🔹 2. Si no hay header, intentar desde COOKIE
    if (!token && req.cookies?.authToken) {
      token = req.cookies.authToken;
    }

    // 🔹 3. Si no hay token en ningún lado
    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    // 🔹 4. Verificar token
    const decoded = verifyToken(token);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(403).json({ error: "Token inválido" });
  }
};