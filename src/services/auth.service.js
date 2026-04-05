import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

// 🔐 REGISTER
export const register = async (username, email, password) => {
  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('El usuario ya existe');
  }

  // 🔥 Hashear password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });

  return newUser;
};

// 🔐 LOGIN
export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  // 🔥 Comparar password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
};