import UserModel from "../../model/User.model.js";
import bcrypt from "bcryptjs";
import { GenerateJwtToken } from "../../utils/generateJwtTokens.util.js";

export const SignUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // Parameters Verifier...
        if (!fullname || !email || !password)
            return res
                .status(400)
                .send("Error: Requires All Fields...");

        if (password.length < 8)
            return res.status(400).send("Error: Password must be Minimum 8 characters...");

        // User Already Exists Verifier...
        const user = await UserModel.findOne({ email });
        if (user)
            return res
                .status(400)
                .send("Error: User Already Exists...");

        // Encrypter...
        const salt = await bcrypt.genSalt(12);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            fullname,
            email,
            password: encryptedPassword,
        });

        if (!newUser)
            return res
                .status(400)
                .send("Error: In Creating A New User");

        //Genrating Json Web Tokens...
        GenerateJwtToken(newUser._id, res);

        // Storing in Database...
        const UserData = await newUser.save();
        UserData["password"] = "";
        
        res.status(201).send(UserData);
        
    } catch (error) {
        // Error Handeling...
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send(`Error: Internal server Error: ${error}`);
    }
};
