import { Router } from 'express';
import { register, login, loginJWT, profile, logout } from '../controllers/auth.controller.js';
import { jwtAuth } from '../middlewares/jwt.middleware.js';
import passport from "passport";
import { generateToken } from "../services/jwt.service.js";

const router = Router();

// 🔹 AUTH BÁSICO
router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

// 🔥 JWT
router.post('/login-jwt', loginJWT);

// 🔒 RUTA PROTEGIDA CON JWT
router.get('/profile-jwt', jwtAuth, (req, res) => {
  res.json({
    message: 'Perfil con JWT',
    user: req.user
  });
});

// 🔥 LOGIN CON PASSPORT LOCAL
router.post("/login-passport",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    });

    res.json({
      message: "Login con Passport exitoso",
      token
    });
  }
);

// =======================================
// 🔥 PASSPORT GITHUB (OAuth)
// =======================================

// 🔹 1. REDIRECCIÓN A GITHUB
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// 🔹 2. CALLBACK (CUANDO VUELVE DE GITHUB)
router.get("/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/auth/login"
  }),
  (req, res) => {

    const token = generateToken(req.user);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    });

    res.json({
      message: "Login con GitHub exitoso",
      token,
      user: req.user
    });
  }
);

export default router;