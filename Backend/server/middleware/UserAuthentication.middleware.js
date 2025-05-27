import jwt from "jsonwebtoken";
import UserModel from "../model/User.model.js";

export const UserAuthentication = async (req, res, next) => {
    try {
        // Parsing Token Cookie... 
        const token = req.cookies.Chatty_JWT_Token;
        if (!token)
            return res.status(400).send({ error: "Error: Invalid - Token Not Available..." });

        // Validating Json Web Token...
        const jwtObj = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!jwtObj)
            return res.status(400).send({ error: "Error: Unauthorised - Token Not Valid..." });

        // Retrival of User Data From DataBase...
        const User = await UserModel.findById(jwtObj.userId).select("-password")
        
        req.user = User;

        // Next To MiddleWare...
        next();

    } catch (error) {
        return res.status(500).send({ error: `Error: Internal Server error, :- ${error}` });
    }
};
