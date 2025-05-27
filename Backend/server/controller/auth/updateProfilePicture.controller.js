import cloudinary from "../../connection/cloudnary.connection.js";
import UserModel from "../../model/User.model.js";

export const UpdateProfilePicture = async (req, res) => {
    const { profilePicture } = req.body;

    // Checking Profile Picture...
    if (!profilePicture)
        return res
            .status(400)
            .send({ error: "Error: Profile Picture Required..." });
    try {
        // Uploading Images to Cloudinary...
        const cloudResponse = await cloudinary.uploader.upload(profilePicture);

        // Storing Infomation in Database...
        const User = await UserModel.findByIdAndUpdate(
            req.user._id,
            { profilePicture: cloudResponse.secure_url },
            { new: true }
        );
        return res
            .status(200)
            .send({ message: "User Profile Picture Updated...", data: User });
            
    } catch (error) {
        // Handeling Error...
        console.log(`Internal Server Error :- ${error}`);
        return res.status(500).send({
            error: `Error: Couldn't Process Profile Picture , :- ${error}`,
        });
    }
};
