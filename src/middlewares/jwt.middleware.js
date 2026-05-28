import { verifyToken } from "../services/jwt.service.js";

export const jwtAuth = (req, res, next) => {
  try {
    let token;

    // HEADER
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // COOKIE
    if (!token && req.cookies?.authToken) {
      token = req.cookies.authToken;
    }

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Token missing"
      });
    }

    console.log("🔐 Verificando JWT...");
    const decoded = verifyToken(token);

    req.user = decoded;
    console.log("✅ JWT válido:", decoded.email);

    next();

  } catch (error) {
    console.error("❌ JWT error:", error.message);

    return res.status(403).json({
      error: "Forbidden",
      message: "Token inválido o expirado"
    });
  }
};