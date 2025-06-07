import express from "express";
import passport from "../connection/googleOAuth.connection.js";
import { GoogleAuthenticateCallback, GoogleSignin } 
    from "../controller/provider/Google/googleAuthenticate.js";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    GoogleAuthenticateCallback,
    GoogleSignin
);

export default router;
