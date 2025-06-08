import UserModel from "../../../model/User.model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { GenerateJwtToken } from "../../../utils/generateJwtTokens.util.js";

dotenv.config();

export const GoogleAuthenticateCallback = async (req, res, next) => {
    const email = req.user.email;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) return next();

        //Generating JWT Token For User Authentication...
        GenerateJwtToken(user._id, res);

        return res.redirect(
            process.env.PROJECT_CURRENTLY == "development"
                ? "http://localhost:7421/"
                : "https://production-URL"
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Error: Internal Server Error...");
    }
};

// Storing User Details in Database...
export const GoogleSignin = async (req, res) => {
    const profile = req.user;
    try {
        let profilePicture = profile.picture;

        try {
            const cloudRes = await cloudinary.uploader.upload(profile.picture);

            profilePicture = cloudRes.secure_url;
        } catch (err) {
            console.error(`Error: Uploading Image Failed... \n${err}`);
        }

        const user = new UserModel({
            fullname: profile.name,
            email: profile.email,
            isGoogleUser: true,
            profilePicture,
        });

        // Inserting in DataBase...
        const newUser = await user.save();

        //Generating JWT Token For User Authentication...
        GenerateJwtToken(newUser._id, res);

        return res.redirect(
            process.env.PROJECT_CURRENTLY == "development"
                ? "http://localhost:7421/"
                : "https://production-URL"
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Error: Internal Server Error...");
    }
};
