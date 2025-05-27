import MessageModel from "../../model/Message.model.js";

export const Messages = async (req, res) => {
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user;

    try {
        const messages = await MessageModel({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
        return res.status(200).send(messages);
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        return res.status(500).send({ error: `Internal Server error :- ${error}` });
    }
};
