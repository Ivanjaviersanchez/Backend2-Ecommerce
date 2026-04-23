import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.authToken;
  }

  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor
  ]),
  secretOrKey: process.env.JWT_SECRET
};

passport.use("jwt", new JwtStrategy(opts, (jwt_payload, done) => {
  try {
    return done(null, jwt_payload);
  } catch (error) {
    return done(error, false);
  }
}));