import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";               
import "./strategies/local.strategy.js";       
import "./strategies/github.strategy.js";
import "./strategies/jwt.strategy.js";

import authRoutes from './routes/auth.routes.js';
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

// 🔥 PASSPORT INIT (ANTES DE LAS RUTAS)
app.use(passport.initialize());

// 🔐 SESSION (el sistema es híbrido)
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 60 * 60
  }),

  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  }
}));

// 🔗 RUTAS
app.use('/api/auth', authRoutes);
app.use("/api/products", productsRouter);

export default app;