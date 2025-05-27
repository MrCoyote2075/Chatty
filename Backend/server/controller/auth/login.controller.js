import bcrypt from "bcryptjs";
import UserModel from "../../model/User.model.js";
import { GenerateJwtToken } from "../../utils/generateJwtTokens.util.js";

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Parameters Verifier...
        if (!email || !password)
            return res.status(400).send("Error: Requires All Fields...");

        //User Data Retrivel From DataBase...
        const User = await UserModel.findOne({ email });

        if (!User) return res.status(400).send("Error: User Not Exists...");

        //Verifing Encrypted Password From The DataBase...
        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        if (!isPasswordCorrect)
            return res.status(400).send("Error: Incorrect Password...");

        //Generating JWT Token For User Authentication...
        GenerateJwtToken(User._id, res);

        return res.status(201).send(User);

    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        return res.status(500).send(error);
    }
};
