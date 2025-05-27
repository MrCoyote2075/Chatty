import bcrypt from "bcryptjs";
import UserModel from "../../model/User.model.js";
import { GenerateJwtToken } from "../../utils/generateJwtTokens.util.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Parameters Verifier...
        if (email && password) {
            
            //User Data Retrivel From DataBase...
            const User = await UserModel.findOne({ email });
            if (User) {
                
                //Verifing Encrypted Password From The DataBase...
                if (await bcrypt.compare(password, User.password)) {
                    
                    //Generating JWT Token...
                    GenerateJwtToken(User._id, res);
                    res.status(200).send("User Successfully Logined...");

                } else res.status(400).send("Error: Incorrect Password...");

            } else res.status(400).send("Error: User Not Exists...");

        } else res.status(400).send("Error: Requires All Fields...");

    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send(error);
    }
};
