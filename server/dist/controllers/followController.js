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
exports.checkFollowerByUserId = exports.checkFollowingByUserId = exports.followUserByUserId = exports.getAllFollowingByUserId = exports.getAllFollowerByUserId = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const userController_1 = require("./userController");
const app_1 = require("../app");
const getAllFollowerByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            result: null,
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
                result: null,
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
            result: null,
        });
    }
});
exports.getAllFollowingByUserId = getAllFollowingByUserId;
const followUserByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const following_id = req.params.userId;
        let message = "";
        let followed;
        const follower_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!follower_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const followerUser = yield (0, userController_1.findUserById)(follower_id);
        const followingUser = yield (0, userController_1.findUserById)(following_id);
        if (!followingUser || !followerUser) {
            res.status(404).json({
                success: false,
                message: "User to follow not found",
                result: null,
            });
            return;
        }
        if (follower_id === following_id) {
            res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
                result: null,
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
            followed = false;
        }
        else {
            yield prisma_1.default.follow.create({
                data: {
                    following_id,
                    follower_id,
                },
            });
            message = "User followed successfully";
            followed = true;
        }
        const followerConut = yield prisma_1.default.follow.count({
            where: {
                following_id,
            },
        });
        // update follower count for following user
        const roomName = `profile-${followingUser.id}`;
        app_1.io.to(roomName).emit("followerCountUpdate", {
            userId: following_id,
            count: followerConut,
        });
        res.status(200).json({
            success: true,
            message,
            result: null,
            followed,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Follow User By User Id",
            result: null,
        });
    }
});
exports.followUserByUserId = followUserByUserId;
const checkFollowingByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const following_user_id = req.params.userId;
        const user_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const user = (yield (0, userController_1.findUserById)(following_user_id));
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        const follow = yield prisma_1.default.follow.findFirst({
            where: {
                follower_id: user_id,
                following_id: user.id,
            },
        });
        res.status(200).json({
            success: true,
            message: follow ? "Is Following" : "Is Not Following",
            result: follow,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Check Following By User Id",
            result: null,
        });
    }
});
exports.checkFollowingByUserId = checkFollowingByUserId;
const checkFollowerByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const follower_user_id = req.params.userId;
        const user_id = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const user = (yield (0, userController_1.findUserById)(follower_user_id));
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        const follow = yield prisma_1.default.follow.findFirst({
            where: {
                follower_id: user.id,
                following_id: user_id,
            },
        });
        res.status(200).json({
            success: true,
            message: follow ? "Is Followed" : "Is Not Followed",
            result: follow,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Check Follower By User Id",
            result: null,
        });
    }
});
exports.checkFollowerByUserId = checkFollowerByUserId;
