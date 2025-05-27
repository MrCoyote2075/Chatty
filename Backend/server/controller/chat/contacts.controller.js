import UserModel from "../../model/User.model.js";

export const Contacts = async (req, res) => {
    const { id:UserId } = req.params;

    try {
        const contactDetails = await UserModel.find({ _id: { $ne: UserId } }).select("-password");
        res.status(200).send(contactDetails);
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send({ error: `Internal Server error :- ${error}` });
    }
};
