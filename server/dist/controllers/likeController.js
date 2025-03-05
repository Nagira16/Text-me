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
exports.toggleLikeByPostUuid = exports.getLikedUserByPostUuid = exports.getLikedPostByUserUuid = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const postRouter_1 = require("./postRouter");
const getLikedPostByUserUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user_id) {
            res.status(404).json({
                success: false,
                message: "User Id Not Found",
            });
            return;
        }
        const likes = yield prisma_1.default.like.findMany({
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
            message: "Liked Post Found Successfully",
            result: likes,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Like By User Uuid",
        });
    }
});
exports.getLikedPostByUserUuid = getLikedPostByUserUuid;
const getLikedUserByPostUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.postId;
    try {
        const post = yield (0, postRouter_1.findPostByUuid)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
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
            message: "Users Found Successfully",
            result: likedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Liked User By Post Uuid",
        });
    }
});
exports.getLikedUserByPostUuid = getLikedUserByPostUuid;
const toggleLikeByPostUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const post_id = req.params.postId;
    let message = "";
    try {
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(404).json({
                success: false,
                message: "User Id Not Found",
            });
            return;
        }
        const post = yield (0, postRouter_1.findPostByUuid)(post_id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post Not Found",
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
        }
        res.status(201).json({
            success: true,
            message: message,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Toggle Like By Post Uuid ",
        });
    }
});
exports.toggleLikeByPostUuid = toggleLikeByPostUuid;
