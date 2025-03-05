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
exports.followUserByUserId = exports.getAllFollowingByUserId = exports.getAllFollowerByUserId = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const userController_1 = require("./userController");
const getAllFollowerByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
            });
            return;
        }
        const followers = yield prisma_1.default.follow.findMany({
            where: {
                following_id: user_id,
            },
            include: {
                follower: {
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
            message: "All Followers Found Successfully",
            result: followers,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get All Follower By User Id",
        });
    }
});
exports.getAllFollowerByUserId = getAllFollowerByUserId;
const getAllFollowingByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
            });
            return;
        }
        const followings = yield prisma_1.default.follow.findMany({
            where: {
                follower_id: user_id,
            },
            include: {
                following: {
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
            message: "All Following Users Found Successfully",
            result: followings,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get Following By User Id",
        });
    }
});
exports.getAllFollowingByUserId = getAllFollowingByUserId;
const followUserByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const following_id = req.params.userId;
        let message = "";
        let follow;
        const follower_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!follower_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
            });
            return;
        }
        const followingUser = yield (0, userController_1.findUserById)(following_id);
        if (!followingUser) {
            res.status(404).json({
                success: false,
                message: "User to follow not found",
            });
            return;
        }
        if (follower_id === following_id) {
            res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
            });
            return;
        }
        const followExist = yield prisma_1.default.follow.findFirst({
            where: {
                following_id,
                follower_id,
            },
        });
        if (followExist) {
            yield prisma_1.default.follow.delete({
                where: {
                    id: followExist.id,
                },
            });
            message = "User unfollowed successfully";
            follow = false;
        }
        else {
            yield prisma_1.default.follow.create({
                data: {
                    following_id,
                    follower_id,
                },
            });
            message = "User followed successfully";
            follow = true;
        }
        res.status(200).json({
            success: true,
            message,
            follow,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Follow User By User Id",
        });
    }
});
exports.followUserByUserId = followUserByUserId;
