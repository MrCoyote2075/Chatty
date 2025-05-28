import express from "express";

import { SignUp } from "../controller/auth/signup.controller.js";
import { Login } from "../controller/auth/login.controller.js";
import { Logout } from "../controller/auth/logout.controller.js";

import { UserAuthentication } from "../middleware/UserAuthentication.middleware.js";
import { UpdateProfilePicture } from "../controller/auth/updateProfilePicture.controller.js";
import { CheckUser } from "../controller/auth/checkUser.controller.js";

const router = express.Router();

// User Authentication Process...
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);

// User Profile Updatation...
router.put("/update-profile-picture", UserAuthentication, UpdateProfilePicture);

// Verifying Authentication...
router.get("/check", UserAuthentication, CheckUser);

export default router;
