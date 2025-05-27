export const Logout = async (req, res) => {
    try {
        res.cookie("Chatty_JWT_Token", "", {
            maxAge: 0,
        });
        res.status(200).send("SuccessFully Loged Out...");
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send({ error: `Error: In Loggin out : ${error}`});
    }
};
