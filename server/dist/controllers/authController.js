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
        const { first_name, last_name, username, email, password } = req.body;
        const image = req.file;
        const emailExist = yield (0, userController_1.findUserByEmail)(email.trim().toLocaleLowerCase());
        if (emailExist) {
            res
                .status(409)
                .json({ success: false, message: "User Already Exists", result: null });
            return;
        }
        const usernameExist = yield (0, userController_1.findUserByUsername)(username.trim());
        if (usernameExist) {
            res.status(409).json({
                success: false,
                message: "Username Already Taken",
                result: null,
            });
            return;
        }
        const validatePassword = (0, exports.validatePasswordLength)(password.trim());
        const validateUsername = (0, exports.validateUsernameLength)(username.trim());
        if (!validatePassword || !validateUsername) {
            res.status(400).json({
                success: false,
                message: [
                    !validatePassword && "Password must be longer than 8.",
                    !validateUsername && "Username must be longer than 4.",
                ]
                    .filter(Boolean)
                    .join(" "),
                result: null,
            });
            return;
        }
        const imageUrl = (image === null || image === void 0 ? void 0 : image.filename)
            ? `http://localhost:5001/uploads/${image.filename}`
            : "https://cdn-icons-png.flaticon.com/512/8847/8847419.png";
        const hashedPassword = yield bcrypt_1.default.hash(password.trim(), 10);
        yield prisma_1.default.user.create({
            data: {
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                username: username.trim(),
                email: email.trim().toLocaleLowerCase(),
                password: hashedPassword,
                profile_image: imageUrl,
            },
        });
        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            result: null,
        });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Register",
            result: null,
        });
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userController_1.findUserByEmail)(email.trim().toLocaleLowerCase());
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Email Or Password Is Wrong",
                result: null,
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password.trim(), user.password);
        if (!isMatch) {
            res.status(404).json({
                success: false,
                message: "Email Or Password Is Wrong",
                result: null,
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
        const userWithoutPassword = {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            result: userWithoutPassword,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Login",
            result: null,
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
            result: null,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error: Logout",
            result: null,
        });
    }
});
exports.logout = logout;
//Sub Function
const validateUsernameLength = (username) => {
    if (username.length < 4) {
        return false;
    }
    return true;
};
exports.validateUsernameLength = validateUsernameLength;
const validatePasswordLength = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
};
exports.validatePasswordLength = validatePasswordLength;
