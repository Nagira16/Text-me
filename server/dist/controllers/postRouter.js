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
exports.deletePostByUuid = exports.updatePostByUuid = exports.createNewPost = exports.getPostByUuid = exports.getAllPosts = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const userController_1 = require("./userController");
const getAllPosts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma_1.default.post.findMany({});
        res.status(200).json({
            success: true,
            message: "All Post Found Successfully",
            result: posts,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get All Posts",
        });
    }
});
exports.getAllPosts = getAllPosts;
const getPostByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    try {
        const post = yield findPostByUuid(uuid);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Post Found Successfully",
            result: post,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Post By Uuid",
        });
    }
});
exports.getPostByUuid = getPostByUuid;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { photo, content } = req.body;
    try {
        const uuid = yield (0, userController_1.getUuidFromCookie)(req);
        if (!uuid) {
            res.status(404).json({
                success: false,
                message: "Uuid Not Found",
            });
            return;
        }
        const newPost = yield prisma_1.default.post.create({
            data: {
                photo,
                content: content || null,
                author_id: uuid,
            },
        });
        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            result: newPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Create New Post",
        });
    }
});
exports.createNewPost = createNewPost;
const updatePostByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    const { content } = req.body;
    try {
        const post = yield findPostByUuid(uuid);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
            });
            return;
        }
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: post.id,
            },
            data: {
                content: content || post.content,
            },
        });
        res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            result: updatedPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Update Post By Uuid",
        });
    }
});
exports.updatePostByUuid = updatePostByUuid;
const deletePostByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    try {
        const post = yield findPostByUuid(uuid);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
            });
            return;
        }
        const deletedPost = yield prisma_1.default.post.delete({
            where: {
                id: post.id,
            },
        });
        res.status(200).json({
            success: true,
            message: "Post Deleted Successfully",
            result: deletedPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Delete Post By Uuid",
        });
    }
});
exports.deletePostByUuid = deletePostByUuid;
//Sub Function
const findPostByUuid = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.post.findUnique({
        where: {
            id: uuid,
        },
    });
});
