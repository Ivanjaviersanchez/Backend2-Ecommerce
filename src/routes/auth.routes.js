import { Router } from 'express';
import { register, login, loginJWT, profile, logout, current } from '../controllers/auth.controller.js';
import { jwtAuth } from '../middlewares/jwt.middleware.js';
import { authorizeRole } from "../middlewares/role.middleware.js";
import passport from "passport";
import { generateToken } from "../services/jwt.service.js";

const router = Router();

// AUTH
router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.get('/current', jwtAuth, current);
router.post('/logout', logout);

// JWT
router.post('/login-jwt', loginJWT);

//  HEADER + COOKIE
router.get('/profile-jwt', jwtAuth, (req, res) => {
  res.json({
    message: 'Perfil con JWT',
    user: req.user
  });
});

//  PASSPORT JWT
router.get(
  "/profile-passport-jwt",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("✅ Passport JWT OK:", req.user);
    res.json({
      message: "Perfil con Passport JWT",
      user: req.user
    });
  }
);

//  CUSTOM CALLBACK
router.get("/profile-custom", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {

    if (err) {
      console.error("❌ Error Passport:", err);
      return next(err);
    }

    if (!user) {
      console.warn("⚠️ Auth fallida:", info?.message);

      return res.status(401).json({
        status: "error",
        message: info?.message || "Token inválido o expirado"
      });
    }

    console.log("✅ Auth exitosa:", user.email);

    return res.json({
      status: "success",
      user
    });

  })(req, res, next);
});

//  ADMIN
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  (req, res) => {
    res.json({
      message: "Bienvenido admin",
      user: req.user
    });
  }
);

// LOGIN PASSPORT
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

// GITHUB
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

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