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
exports.findUserByUsername = exports.findUserByEmail = exports.deleteUserByUuid = exports.updateUserByUuid = exports.getUserByUuid = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const authController_1 = require("./authController");
const getUserByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    try {
        const user = yield findUserByUuid(uuid);
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
exports.getUserByUuid = getUserByUuid;
const updateUserByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    const { first_name, last_name, profile_image, username } = req.body;
    try {
        const user = yield findUserByUuid(uuid);
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
exports.updateUserByUuid = updateUserByUuid;
const deleteUserByUuid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.id;
    try {
        const user = yield findUserByUuid(uuid);
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
exports.deleteUserByUuid = deleteUserByUuid;
//Sub Function
const findUserByUuid = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id: uuid,
        },
    });
});
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
