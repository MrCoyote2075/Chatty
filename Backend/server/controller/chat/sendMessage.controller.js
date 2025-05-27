import cloudinary from "../../connection/cloudnary.connection.js";
import MessageModel from "../../model/Message.model.js";

export const SendMessages = async (req, res) => {
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user;
    const { text, image } = req.body;
    let image_url;

    try {
        // Checking If Both Are Empty...
        if (!text && !image)
            return res
                .status(400)
                .send({ error: `Error: No Messages Found...` });

        // Storing Image in Cloudinary...
        if (image) {
            image_url = await cloudinary.uploader
                .upload(image)
                .then((res) => res.secure_url)
                .catch((error) =>
                    res.status(500).send({
                        error: `Error: Unable To Store Images..., :- ${error}`,
                    })
                );
        }

        // Creating User's Message model...
        const message = await MessageModel({
            senderId,
            receiverId,
            text,
            image: image_url,
        });

        // Verifing Message schema...
        if (!message)
            return res
                .status(400)
                .send({ error: `Error: Message Cannot Be Created` });

        await message.save();
        res.status(200).send(message);
    } catch (error) {
        console.log(`Internal Server Error :- ${error}`);
        res.status(500).send({ error: `Internal Server error :- ${error}` });
    }
};
