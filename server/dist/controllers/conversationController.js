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
exports.getConversationById = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getConversationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation_id = req.params.id;
        const conversation = yield findConversationById(conversation_id);
        if (!conversation) {
            res.status(404).json({
                success: false,
                message: "Conversation Not Found",
                result: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Conversation Found Successfully",
            result: conversation,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Conversation By Id",
            result: null,
        });
    }
});
exports.getConversationById = getConversationById;
// Sub Function
const findConversationById = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.conversation.findUnique({
        where: {
            id: uuid,
        },
        include: {
            user1: {
                select: {
                    id: true,
                    username: true,
                    profile_image: true,
                },
            },
            user2: {
                select: {
                    id: true,
                    username: true,
                    profile_image: true,
                },
            },
        },
    });
});
