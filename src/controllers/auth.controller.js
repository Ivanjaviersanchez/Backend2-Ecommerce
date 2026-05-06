import * as authService from '../services/auth.service.js';
import { generateToken } from "../services/jwt.service.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const user = await authService.register({
      first_name,
      last_name,
      email,
      age,
      password
    });

    //  ELIMINA PASSWORD DE RESPUESTA
    const { password: _, ...userSafe } = user.toObject();

    res.status(201).json({
      status: "success",
      payload: userSafe
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// LOGIN SESSION 
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Credenciales inválidas"
    });
  }

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  res.json({
    status: "success",
    message: "Login exitoso"
  });
};

//  LOGIN JWT
export const loginJWT = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas"
      });
    }

    const token = generateToken(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    });

    res.json({
      status: "success",
      message: "Login JWT exitoso",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error en login JWT"
    });
  }
};

// PROFILE (SESSION)
export const profile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      status: "error",
      message: "No logueado"
    });
  }

  res.json({
    status: "success",
    user: req.session.user
  });
};

// LOGOUT
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error al cerrar sesión"
      });
    }

    res.clearCookie('connect.sid');

    res.json({
      status: "success",
      message: "Logout OK"
    });
  });
};

//  CURRENT (JWT)
export const current = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Usuario no autenticado"
    });
  }

  const { password, ...userData } = req.user;

  res.json({
    status: "success",
    user: userData
  });
};