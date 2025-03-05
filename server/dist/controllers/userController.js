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
exports.findUserByUsername = exports.findUserByEmail = exports.findUserById = exports.deleteUserById = exports.updateUserById = exports.getUserById = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const authController_1 = require("./authController");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
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
            message: "Server Error: Get User By Uuid",
        });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { first_name, last_name, profile_image, username } = req.body;
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!user_id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token",
            });
            return;
        }
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            });
            return;
        }
        if (username) {
            const validateUsername = (0, authController_1.validateUsernameLength)(username.trim());
            if (!validateUsername) {
                res.status(400).json({
                    success: false,
                    message: "Username must be between 4 and 16 characters",
                });
                return;
            }
            const usernameExist = yield (0, exports.findUserByUsername)(username.trim());
            if (usernameExist) {
                res.status(409).json({
                    success: false,
                    message: "Username Already Taken",
                });
                return;
            }
        }
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                first_name: (first_name === null || first_name === void 0 ? void 0 : first_name.trim()) || user.first_name,
                last_name: (last_name === null || last_name === void 0 ? void 0 : last_name.trim()) || user.last_name,
                profile_image: (profile_image === null || profile_image === void 0 ? void 0 : profile_image.trim()) || user.profile_image,
                username: (username === null || username === void 0 ? void 0 : username.trim()) || user.username,
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
            message: "Server Error: Update User By Uuid",
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
            });
            return;
        }
        const user = yield (0, exports.findUserById)(user_id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            });
            return;
        }
        const deletedUser = yield prisma_1.default.user.delete({
            where: {
                id: user.id,
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
            message: "Server Error: Delete User By Uuid",
        });
    }
});
exports.deleteUserById = deleteUserById;
//Sub Function
const findUserById = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id: uuid,
        },
    });
});
exports.findUserById = findUserById;
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
    });
});
exports.findUserByUsername = findUserByUsername;
