export const Logout = async (req, res) => {
    try {
        res.cookie("Chatty_JWT_Token", "", { maxAge: 0 });
        return res.status(200).send("Logout Successfull");
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send(`Error: In Loggin out : ${error}`);
    }
};
