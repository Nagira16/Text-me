"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const testController_1 = require("../controllers/testController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app_1 = require("../app");
const authRouter = (0, express_1.Router)();
//http://localhost:5001/auth
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, app_1.uploadDir);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path_1.default.extname(file.originalname));
        },
    }),
});
authRouter.get("/", testController_1.testGetToken);
authRouter.post("/register", upload.single("profile_image"), authController_1.registerNewUser);
authRouter.post("/login", authController_1.loginUser);
authRouter.post("/logout", authController_1.logout);
exports.default = authRouter;
