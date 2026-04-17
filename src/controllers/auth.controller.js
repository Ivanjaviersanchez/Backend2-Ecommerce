import * as authService from '../services/auth.service.js';
import { generateToken } from "../services/jwt.service.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    res.send({
      message: 'Usuario creado',
      user
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// LOGIN SESSION 
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  if (!user) {
    return res.status(401).send('Credenciales inválidas');
  }

  //  SESIÓN
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role //  clave
  };

  res.send('Login exitoso');
};

//  LOGIN JWToken
export const loginJWT = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    if (!user) {
      return res.status(401).send("Credenciales inválidas");
    }

    const token = generateToken(user);

    // 🔥 COOKIE CON JWT (IMPORTANTE PARA ENTREGA FINAL)
    res.cookie("authToken", token, {
      httpOnly: true,     // no accesible desde JS (seguridad)
      sameSite: "lax",    // protección CSRF básica
      secure: false,      // ⚠️ true en producción (https)
      maxAge: 1000 * 60 * 60 // 1 hora
    });

    res.json({
      message: "Login JWT exitoso",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login JWT" });
  }
};

// PROFILE
export const profile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('No logueado');
  }

  res.send(req.session.user);
};

// LOGOUT
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }

    res.clearCookie('connect.sid'); // 🔥 importante
    res.send('Logout OK');
  });
};