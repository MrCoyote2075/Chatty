export const CheckUser = (req, res) => {
    try {
        return res
            .status(200)
            .send(req.user);
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        return res
            .status(500)
            .send({ error: `Error: Internal Server error, :- ${error}` });
    }
};
