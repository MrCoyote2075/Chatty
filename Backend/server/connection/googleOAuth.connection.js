import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: "478156185833-na2833u1kf0vhv7j7es8h21un32khmnd.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:1247/auth/provider/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile._json);
        }
    )
);

export default passport;
