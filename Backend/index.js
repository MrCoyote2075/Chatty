//Maximum Effort.....

//Package Importing Part...
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./server/router/auth.router.js";
import connectMongoDb from "./server/connection/mongo.connection.js";
import chatRouter from "./server/router/chat.router.js";
import cors from "cors";

//Configure Part...
dotenv.config();
connectMongoDb();
const app = express();
app.use(cors({
        origin: "http://localhost:7421",
        credentials: true,
    })
);
const port = process.env.PORT || 8080;

//Extracter Part...
app.use(express.json());
app.use(cookieParser());

//Authenticating Part...
app.use("/api/auth", authRouter);

//Chatting Api Part...
app.use("/api/chat", chatRouter);

//Server Lienting Part...
app.listen(port, () =>
    console.log(`Server Is Running At : http://localhost:${port}`)
);
