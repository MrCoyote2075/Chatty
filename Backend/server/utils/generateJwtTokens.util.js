import jwt from "jsonwebtoken";

export const GenerateJwtToken = (userId, res) => {
    // Token...
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    // Cookie...
    res.cookie("Chatty_JWT_Token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // weeks * days * hours * mins * secs * millis ...
        httpOnly: true, //url secure...
        sameSite: "strict", // requests From My Site Only Allowed...
        secure: false, // protocol security... [https]
    });
    
    return token;
};
