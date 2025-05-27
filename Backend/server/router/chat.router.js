import express from "express";

import { Contacts } from "../controller/chat/contacts.controller.js";
import { UserAuthentication } from "../middleware/UserAuthentication.middleware.js";
import { SendMessages } from "../controller/chat/sendMessage.controller.js";
import { Messages } from "../controller/chat/messages.controller.js";

const router = express.Router();

// User Chat Api...
router.get("/contacts/:id", UserAuthentication, Contacts);
router.get("/messages/:id", UserAuthentication, Messages);
router.post("/send-message/:id", UserAuthentication, SendMessages);

export default router;
