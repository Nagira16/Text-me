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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!secretKey)
            throw new Error("Secrec Key Undefined");
        const cookieToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        const authHeader = req.headers["authorization"];
        const headerToken = authHeader && authHeader.split(" ")[1];
        const token = cookieToken || headerToken;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Token not provided",
            });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(403).json({ success: false, message: "Forbidden" });
    }
});
exports.authMiddleware = authMiddleware;
