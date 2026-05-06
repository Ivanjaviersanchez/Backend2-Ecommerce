import { verifyToken } from "../services/jwt.service.js";

import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  try {
    let token;

    //  1- DESDE HEADER
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    //  2- DESDE COOKIE
    if (!token && req.cookies?.authToken) {
      token = req.cookies.authToken;
    }

    //  SIN TOKEN
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Token missing"
      });
    }

    //  VERIFICAR TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    //  TOKEN INVÁLIDO
    return res.status(403).json({
      error: "Forbidden",
      message: "Token inválido o expirado"
    });
  }
};