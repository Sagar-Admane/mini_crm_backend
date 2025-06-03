import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "dotenv"

env.config()

passport.use(new GoogleStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL : "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj))