import UserModel from "../../model/User.model.js";
import bcrypt from "bcryptjs";
import { GenerateJwtToken } from "../../utils/generateJwtTokens.util.js";

export const SignUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        
        // Parameters Verifier...
        if (fullname && email && password) {
            if (password.length >= 8) {

                // User Already Exists Verifier...
                const user = await UserModel.findOne({ email });
                if (!user) {
                    // Encrypter...
                    const salt = await bcrypt.genSalt(12);
                    const encryptedPassword = await bcrypt.hash(password, salt);
                    const newUser = new UserModel({
                        fullname,
                        email,
                        password: encryptedPassword,
                    });

                    if (newUser) {

                        //Genrating Json Web Tokens...
                        GenerateJwtToken(newUser._id, res);
                        
                        // Storing in Database... 
                        await newUser.save();  
                        
                        res.status(201)
                            .send("User Signed Succesfully...");
                    } 
                    else res.status(400)
                            .send({error: "Error: In Creating A New User"});

                } else res.status(400)
                            .send({error: "Error: User Already Exists..."});
            } else
                res.status(400)
                    .send({error: "Error: Password must be Minimum 8 characters..."});

        } else res.status(400)
                    .send({error:"Error: Requires All Fields..."});
    } 
    
    // Error Handeling...
    catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send({error: `Error: Internal server Error: ${error}`});
    }
};
