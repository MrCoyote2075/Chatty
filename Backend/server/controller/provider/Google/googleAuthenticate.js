import UserModel from "../../../model/User.model.js";

export const GoogleAuthenticateCallback = async (req, res, next) => {
    const email = req.user.email;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) return next();

        //Generating JWT Token For User Authentication...
        GenerateJwtToken(user._id, res);

        return res.status(200).send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error: Internal Server Error...");
    }
};

// Storing User Details in Database...
export const GoogleSignin = async (req, res) => {
    const profile = req.user;
    try {
        const user = new UserModel({
            fullname: profile.name,
            email: profile.email,
            isGoogleUser: true,
            profilePicture: profile.picture,
        });

        // Inserting in DataBase...
        const newUser = await user.save();

        //Generating JWT Token For User Authentication...
        GenerateJwtToken(newUser._id, res);
        
        return res.status(200).send(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error: Internal Server Error...");
    }
};
