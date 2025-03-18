"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const messageRouter = (0, express_1.Router)();
// http://localhost:5001/message
messageRouter.get("/:conversationId", messageController_1.getMessagesByConversationId);
exports.default = messageRouter;
