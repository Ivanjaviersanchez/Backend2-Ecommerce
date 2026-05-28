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

      // IMPORTANTE
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        const email = profile.emails?.[0]?.value;

        // BUSCAR USUARIO
        let user = await User.findOne({
          email: email || `${profile.username}@github.com`
        });

        // CREAR SI NO EXISTE
        if (!user) {

          user = await User.create({
            first_name: profile.displayName || profile.username,
            last_name: "GitHubUser",
            age: 18,
            email: email || `${profile.username}@github.com`,
            password: "oauthgithub",
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