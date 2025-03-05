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
exports.validatePasswordLength = exports.validateUsernameLength = exports.logout = exports.loginUser = exports.registerNewUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController_1 = require("./userController");
const secretKey = process.env.SECRET_KEY;
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, email, password, profile_image, } = req.body;
        const emailExist = yield (0, userController_1.findUserByEmail)(email.trim());
        if (emailExist) {
            res.status(409).json({ success: false, message: "User Already Exists" });
            return;
        }
        const usernameExist = yield (0, userController_1.findUserByUsername)(username.trim());
        if (usernameExist) {
            res
                .status(409)
                .json({ success: false, message: "Username Already Taken" });
            return;
        }
        const validatePassword = (0, exports.validatePasswordLength)(password.trim());
        const validateUsername = (0, exports.validateUsernameLength)(username.trim());
        if (!validatePassword || !validateUsername) {
            res.status(400).json({
                success: false,
                message: [
                    !validatePassword && "Password must be between 8 and 16 characters.",
                    !validateUsername && "Username must be between 4 and 16 characters.",
                ]
                    .filter(Boolean)
                    .join(" "),
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password.trim(), 10);
        yield prisma_1.default.user.create({
            data: {
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                username: username.trim(),
                email: email.trim(),
                password: hashedPassword,
                profile_image: (profile_image === null || profile_image === void 0 ? void 0 : profile_image.trim()) ||
                    "https://cdn-icons-png.flaticon.com/512/8847/8847419.png",
            },
        });
        res.status(201).json({ success: true, message: "Registered Successfully" });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server Error: Register" });
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userController_1.findUserByEmail)(email.trim());
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Email Or Password Is Wrong",
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password.trim(), user.password);
        if (!isMatch) {
            res.status(404).json({
                success: false,
                message: "Email Or Password Is Wrong",
            });
            return;
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            profile_image: user.profile_image,
        };
        if (!secretKey)
            throw new Error("Secrec Key Undefined");
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "2d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 10800000,
        });
        res.status(200).json({ success: true, message: "Logged In Successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Login",
        });
    }
});
exports.loginUser = loginUser;
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        });
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Logout",
        });
    }
});
exports.logout = logout;
//Sub Function
const validateUsernameLength = (username) => {
    if (username.length <= 4) {
        return false;
    }
    return true;
};
exports.validateUsernameLength = validateUsernameLength;
const validatePasswordLength = (password) => {
    if (password.length <= 8 || password.length >= 16) {
        return false;
    }
    return true;
};
exports.validatePasswordLength = validatePasswordLength;
