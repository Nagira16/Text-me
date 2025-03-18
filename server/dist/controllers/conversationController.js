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
exports.createConversation = exports.getAllConversation = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAllConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const conversations = yield prisma_1.default.conversation.findMany({
            where: {
                OR: [{ user1_id: user_id }, { user2_id: user_id }],
            },
            include: {
                user1: { select: { id: true, username: true, profile_image: true } },
                user2: { select: { id: true, username: true, profile_image: true } },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        res.status(200).json({
            success: true,
            message: "All Conversations Found Successfully",
            result: conversations,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get All Conversation",
            result: null,
        });
    }
});
exports.getAllConversation = getAllConversation;
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { user2_id } = req.body;
        const user1_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user1_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const existingConversation = yield prisma_1.default.conversation.findFirst({
            where: {
                OR: [
                    { user1_id, user2_id },
                    { user1_id: user2_id, user2_id: user1_id },
                ],
            },
            include: {
                user1: { select: { id: true, username: true, profile_image: true } },
                user2: { select: { id: true, username: true, profile_image: true } },
            },
        });
        if (existingConversation) {
            res.status(200).json({
                success: true,
                message: "Conversation Already Exist",
                result: existingConversation,
            });
            return;
        }
        const conversation = yield prisma_1.default.conversation.create({
            data: { user1_id, user2_id },
            include: {
                user1: { select: { id: true, username: true, profile_image: true } },
                user2: { select: { id: true, username: true, profile_image: true } },
            },
        });
        res.status(200).json({
            success: true,
            message: "Conversations Created Successfully",
            result: conversation,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Create Conversation",
            result: null,
        });
    }
});
exports.createConversation = createConversation;
