"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessagesByConversationId = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getMessagesByConversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation_id = req.params.conversationId;
        const messages = yield prisma_1.default.message.findMany({
            where: { conversation_id },
            include: {
                sender: { select: { id: true, username: true, profile_image: true } },
            },
            orderBy: { created_at: "asc" },
        });
        res.status(200).json({
            success: true,
            messages: "Message Found Successfully",
            result: messages,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Messages By Conversation Id",
            result: null,
        });
    }
});
exports.getMessagesByConversationId = getMessagesByConversationId;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { content } = req.body;
        const conversation_id = req.params.conversationId;
        const sender_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!sender_id) {
            res
                .status(401)
                .json({ success: false, message: "Unauthorized", result: null });
            return;
        }
        const message = yield prisma_1.default.message.create({
            data: {
                sender_id,
                conversation_id,
                content,
            },
            include: {
                sender: { select: { id: true, username: true, profile_image: true } },
            },
        });
        res.status(201).json({
            success: true,
            messages: "Message Created Successfully",
            result: message,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Send Message",
            result: null,
        });
    }
});
exports.sendMessage = sendMessage;
