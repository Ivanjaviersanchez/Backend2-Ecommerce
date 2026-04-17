import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// 🔥 CONFIGURACIÓN DE LA ESTRATEGIA
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // usamos email en vez de username
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Usuario no existe" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return done(null, false, { message: "Password incorrecto" });
        }

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;