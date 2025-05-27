import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
