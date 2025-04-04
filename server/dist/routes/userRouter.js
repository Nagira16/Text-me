"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const userRouter = (0, express_1.Router)();
//http://localhost:5001/user
const uploadDir = path_1.default.join(__dirname, "../../src/uploads");
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadDir);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path_1.default.extname(file.originalname));
        },
    }),
});
userRouter.get("/", userController_1.getUser);
userRouter.get("/search", userController_1.queryUser);
userRouter.get("/:id", userController_1.getUserById);
userRouter.put("/", upload.single("profile_image"), userController_1.updateUserById);
userRouter.put("/password", userController_1.updatePasspordById);
userRouter.delete("/:id", userController_1.deleteUserById);
exports.default = userRouter;
