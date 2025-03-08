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
exports.deleteCommentyId = exports.updateCommentById = exports.createNewComment = exports.getCommentByPostId = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const postRouter_1 = require("./postRouter");
const getCommentByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.params.postId;
        const post = yield (0, postRouter_1.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const postComments = yield prisma_1.default.comment.findMany({
            where: {
                post_id: post.id,
            },
            include: {
                user: { select: { id: true, username: true, profile_image: true } },
            },
        });
        res.status(200).json({
            success: true,
            message: "Comment Found Successfully",
            result: postComments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Comment By Post Id",
            result: null,
        });
    }
});
exports.getCommentByPostId = getCommentByPostId;
const createNewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { post_id, content } = req.body;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const post = yield (0, postRouter_1.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const newComment = yield prisma_1.default.comment.create({
            data: {
                content,
                user_id,
                post_id: post.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true,
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: "Comment Created Successfully",
            result: newComment,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Create New Comment",
            result: null,
        });
    }
});
exports.createNewComment = createNewComment;
const updateCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment_id = req.params.id;
        const { content } = req.body;
        const comment = yield findCommentById(comment_id);
        if (!comment) {
            res.status(404).json({
                success: false,
                message: "Comment Not Found",
                result: null,
            });
            return;
        }
        const updatedComment = yield prisma_1.default.comment.update({
            where: {
                id: comment.id,
            },
            data: {
                content: content || comment.content,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            message: "Comment Updated Successfully",
            result: updatedComment,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Update Comment By Id",
            result: null,
        });
    }
});
exports.updateCommentById = updateCommentById;
const deleteCommentyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment_id = req.params.id;
        const comment = yield findCommentById(comment_id);
        if (!comment) {
            res.status(404).json({
                success: false,
                message: "Comment Not Found",
                result: null,
            });
            return;
        }
        const deletedComment = yield prisma_1.default.comment.delete({
            where: {
                id: comment.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            message: "Comment Deleted Successfully",
            result: deletedComment,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Delete Comment By Id",
            result: null,
        });
    }
});
exports.deleteCommentyId = deleteCommentyId;
// Sub Function
const findCommentById = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.comment.findUnique({
        where: { id: uuid },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profile_image: true,
                },
            },
        },
    });
});
