import * as authService from '../services/auth.service.js';

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

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  if (!user) {
    return res.status(401).send('Credenciales inválidas');
  }

  // 🔥 SESIÓN
  req.session.user = {
    id: user._id,
    email: user.email,
    username: user.username
  };

  res.send('Login exitoso');
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