import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //  BUSCAR USUARIO POR EMAIL
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({ email });

        //  SI NO EXISTE LO CREA
        if (!user) {
          user = await User.create({
            username: profile.username,
            email: email || `${profile.username}@github.com`,
            password: "oauth", // placeholder
            role: "user"
          });
        }

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;