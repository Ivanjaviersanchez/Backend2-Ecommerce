import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const register = async (username, email, password) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: "user" // 🔥 CLAVE
  });

  return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
};