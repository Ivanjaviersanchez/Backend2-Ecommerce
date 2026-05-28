import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";

// STRATEGIES
import "./strategies/local.strategy.js";
import "./strategies/github.strategy.js";
import "./strategies/jwt.strategy.js";

// ROUTES
import authRoutes from './routes/v1/auth.routes.js';
import productsRouter from "./routes/v1/products.routes.js";
import systemRoutes from "./routes/v1/system.routes.js";

// MIDDLEWARES
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// JSON
app.use(express.json());

// COOKIES
app.use(cookieParser());

// SESSION
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  }
}));

// PASSPORT
app.use(passport.initialize());

// ROUTES VERSIONADAS
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/system", systemRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada"
  });
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;