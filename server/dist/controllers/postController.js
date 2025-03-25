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
exports.findPostById = exports.deletePostById = exports.updatePostById = exports.createNewPost = exports.getPostById = exports.getFollowingUsersAllPosts = exports.getAllPosts = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAllPosts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma_1.default.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });
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
            result: null,
        });
    }
});
exports.getAllPosts = getAllPosts;
const getFollowingUsersAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
                result: null,
            });
            return;
        }
        const followingUsers = yield prisma_1.default.follow.findMany({
            where: { follower_id: userId },
        });
        const followingUserIds = followingUsers.map((f) => f.following_id);
        const posts = yield prisma_1.default.post.findMany({
            where: {
                author_id: { in: followingUserIds },
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profile_image: true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });
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
            result: null,
        });
    }
});
exports.getFollowingUsersAllPosts = getFollowingUsersAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.params.id;
        const post = yield (0, exports.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
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
            message: "Server Error: Get Post By Id",
            result: null,
        });
    }
});
exports.getPostById = getPostById;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { content } = req.body;
        const photo = req.file;
        if (!photo) {
            res.status(400).json({
                success: false,
                message: "Bad Request: No image uploaded",
                result: null,
            });
            return;
        }
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const photoUrl = `http://localhost:5001/uploads/${photo.filename}`;
        const newPost = yield prisma_1.default.post.create({
            data: {
                photo: photoUrl,
                content: content || null,
                author_id: user_id,
            },
            include: {
                author: {
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
            message: "Post Created Successfully",
            result: newPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Create New Post",
            result: null,
        });
    }
});
exports.createNewPost = createNewPost;
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.params.id;
        const { content } = req.body;
        const post = yield (0, exports.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
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
            include: {
                author: {
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
            message: "Post Updated Successfully",
            result: updatedPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Update Post By Id",
            result: null,
        });
    }
});
exports.updatePostById = updatePostById;
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.params.id;
        const post = yield (0, exports.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const deletedPost = yield prisma_1.default.post.delete({
            where: {
                id: post.id,
            },
            include: {
                author: {
                    select: { id: true, username: true, profile_image: true },
                },
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
            message: "Server Error: Delete Post By Id",
            result: null,
        });
    }
});
exports.deletePostById = deletePostById;
//Sub Function
const findPostById = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.post.findUnique({
        where: {
            id: uuid,
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    profile_image: true,
                },
            },
        },
    });
});
exports.findPostById = findPostById;
