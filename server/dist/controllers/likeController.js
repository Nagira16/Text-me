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
exports.checkLikedByPostId = exports.toggleLikeByPostId = exports.getLikedUserByPostId = exports.getLikedPostByUserId = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const postController_1 = require("./postController");
const app_1 = require("../app");
const getLikedPostByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const likedPost = yield prisma_1.default.like.findMany({
            where: {
                user_id,
            },
            include: {
                post: {
                    select: {
                        id: true,
                        content: true,
                        photo: true,
                        created_at: true,
                        likes_count: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            message: "Liked Posts Found Successfully",
            result: likedPost,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Like By User Id",
            result: null,
        });
    }
});
exports.getLikedPostByUserId = getLikedPostByUserId;
const getLikedUserByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = req.params.postId;
        const post = yield (0, postController_1.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const likedUser = yield prisma_1.default.like.findMany({
            where: {
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
        res.status(200).json({
            success: true,
            message: "Liked Users Found Successfully",
            result: likedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Liked User By Post Id",
            result: null,
        });
    }
});
exports.getLikedUserByPostId = getLikedUserByPostId;
const toggleLikeByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const post_id = req.params.postId;
        let message = "";
        let liked;
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const post = yield (0, postController_1.findPostById)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const likeExsit = yield prisma_1.default.like.findFirst({
            where: {
                user_id,
                post_id: post.id,
            },
        });
        if (likeExsit) {
            yield prisma_1.default.$transaction([
                prisma_1.default.like.delete({
                    where: { id: likeExsit.id },
                }),
                prisma_1.default.post.update({
                    where: { id: post.id },
                    data: { likes_count: { decrement: 1 } },
                }),
            ]);
            message = "Like Removed";
            liked = false;
        }
        else {
            yield prisma_1.default.$transaction([
                prisma_1.default.like.create({ data: { user_id, post_id: post.id } }),
                prisma_1.default.post.update({
                    where: { id: post.id },
                    data: { likes_count: { increment: 1 } },
                }),
            ]);
            message = "Post Liked";
            liked = true;
            // notification for author user
            app_1.io.to(post.author_id).emit("postLikedNotification", {
                post,
                user_id,
                liked,
            });
        }
        res.status(201).json({
            success: true,
            message,
            liked,
            result: null,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Toggle Like By Post Id ",
            result: null,
        });
    }
});
exports.toggleLikeByPostId = toggleLikeByPostId;
const checkLikedByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const post_id = req.body.post_id;
        const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const post = (yield (0, postController_1.findPostById)(post_id));
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
                result: null,
            });
            return;
        }
        const like = yield prisma_1.default.like.findFirst({
            where: {
                user_id,
                post_id,
            },
        });
        res.status(200).json({
            success: true,
            message: "Like Found Successfully",
            result: like,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Check Liked By Post Id",
            result: null,
        });
    }
});
exports.checkLikedByPostId = checkLikedByPostId;
