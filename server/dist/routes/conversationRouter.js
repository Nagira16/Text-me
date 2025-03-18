"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversationController_1 = require("../controllers/conversationController");
const conversationRouter = (0, express_1.Router)();
conversationRouter.get("/", conversationController_1.getAllConversation);
conversationRouter.post("/", conversationController_1.createConversation);
exports.default = conversationRouter;
