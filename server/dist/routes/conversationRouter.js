"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversationController_1 = require("../controllers/conversationController");
const conversationRouter = (0, express_1.Router)();
conversationRouter.get("/:id", conversationController_1.getConversationById);
exports.default = conversationRouter;
