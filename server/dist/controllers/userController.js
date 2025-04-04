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
exports.findUserByUsername = exports.findUserByEmail = exports.findUserByEmailWithoutPassword = exports.findUserById = exports.updatePasspordById = exports.deleteUserById = exports.updateUserById = exports.queryUser = exports.getUserById = exports.getUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const authController_1 = require("./authController");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User Found Successfully",
            result: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get User",
            result: null,
        });
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const user = yield prisma_1.default.user.findUnique({
            where: { id: user_id },
            omit: { password: true },
            include: {
                post: {
                    select: {
                        id: true,
                        photo: true,
                        content: true,
                        created_at: true,
                        likes_count: true,
                        updated_at: true,
                    },
                },
            },
        });
        const followerCount = yield prisma_1.default.follow.count({
            where: { following_id: user_id },
        });
        const followingCount = yield prisma_1.default.follow.count({
            where: { follower_id: user_id },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User Found Successfully",
            result: { user, followerCount, followingCount },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Get User By Id",
            result: null,
        });
    }
});
exports.getUserById = getUserById;
const queryUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        if (!query) {
            res.status(400).json({
                success: false,
                message: "Search query is required",
                result: null,
            });
            return;
        }
        const users = yield prisma_1.default.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                username: true,
                profile_image: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Users Found Successfully",
            result: users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Query User",
            result: null,
        });
    }
});
exports.queryUser = queryUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { first_name, last_name, username } = req.body;
        const image = req.file;
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        if (username) {
            const validateUsername = (0, authController_1.validateUsernameLength)(username.trim());
            if (!validateUsername) {
                res.status(400).json({
                    success: false,
                    message: "Username must be between 4 and 16 characters",
                    result: null,
                });
                return;
            }
            const usernameExist = yield (0, exports.findUserByUsername)(username.trim());
            if (usernameExist) {
                res.status(409).json({
                    success: false,
                    message: "Username Already Taken",
                    result: null,
                });
                return;
            }
        }
        const image_url = image
            ? `http://localhost:5001/uploads/${image.filename}`
            : user.profile_image;
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                first_name: (first_name === null || first_name === void 0 ? void 0 : first_name.trim()) || user.first_name,
                last_name: (last_name === null || last_name === void 0 ? void 0 : last_name.trim()) || user.last_name,
                profile_image: image_url,
                username: (username === null || username === void 0 ? void 0 : username.trim()) || user.username,
            },
            omit: {
                password: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            result: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Update User By Id",
            result: null,
        });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        const deletedUser = yield prisma_1.default.user.delete({
            where: {
                id: user.id,
            },
            omit: {
                password: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            result: deletedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Delete User By Id",
            result: null,
        });
    }
});
exports.deleteUserById = deleteUserById;
const updatePasspordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { current_password, new_password, confirm_password, } = req.body;
        const user_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
                result: null,
            });
            return;
        }
        if (new_password !== confirm_password) {
            res.status(409).json({
                success: false,
                message: "Password Not Match",
                result: null,
            });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { id: user_id },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                result: null,
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(current_password.trim(), user.password);
        if (!isMatch) {
            res.status(404).json({
                success: false,
                message: "Current Password Is Wrong",
                result: null,
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(new_password.trim(), 10);
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });
        res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
            result: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Update Password By Id",
            result: null,
        });
    }
});
exports.updatePasspordById = updatePasspordById;
//Sub Function
const findUserById = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id: uuid,
        },
        omit: {
            password: true,
        },
    });
});
exports.findUserById = findUserById;
const findUserByEmailWithoutPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
        omit: {
            password: true,
        },
    });
});
exports.findUserByEmailWithoutPassword = findUserByEmailWithoutPassword;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
});
exports.findUserByEmail = findUserByEmail;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            username,
        },
        omit: {
            password: true,
        },
    });
});
exports.findUserByUsername = findUserByUsername;
