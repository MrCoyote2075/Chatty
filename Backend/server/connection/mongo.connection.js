import mongoose from "mongoose";

const connectMongoDb = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then((res) => console.log("Server Connected to Database :" , res.connections[0].name))
        .catch((error) => {
            console.log("Database Connection Failed..");
        });
};

export default connectMongoDb;