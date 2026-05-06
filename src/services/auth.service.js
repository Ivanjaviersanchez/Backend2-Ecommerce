import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

// REGISTER
export const register = async (userData) => {
  const { first_name, last_name, email, age, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('El usuario ya existe');
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    age,
    password,
    role: "user"
  });

  return newUser;
};

// LOGIN
export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
};