import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.routes.js';
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // 👈 ahora sí existe
    ttl: 60 * 60
  }),

  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  }
}));

app.use('/api/auth', authRoutes);

app.use("/api/products", productsRouter);

export default app;