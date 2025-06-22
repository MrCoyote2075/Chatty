//Maximum Effort.....

//Package Importing Part...
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./server/router/auth.router.js";
import connectMongoDb from "./server/connection/mongo.connection.js";
import passport from "./server/connection/googleOAuth.connection.js";
import chatRouter from "./server/router/chat.router.js";
import googleAuthRouter from "./server/router/auth.provider.router.js";
import cors from "cors";

//Configure Part...
dotenv.config();
connectMongoDb();
const app = express();

app.use(
    cors({
        origin: ["http://localhost:7421","https://production-URL"],
        credentials: true,
    })
);

const port = process.env.PORT;

//Extracter Part...
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//Normal Authenticating Part...
app.use("/auth", authRouter);

//Google Authenticating Part...
app.use("/auth/provider", googleAuthRouter);

//Chatting Api Part...
app.use("/api/chats", chatRouter);

//Server Lienting Part...
app.listen(port, () =>
    console.log(`Server Is Running At : http://localhost:${port}`)
);
