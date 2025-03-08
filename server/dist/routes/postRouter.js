"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadDir = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const postRouter_1 = require("../controllers/postRouter");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const postRouter = (0, express_1.Router)();
//http://localhost:5001/post
exports.uploadDir = path_1.default.join(__dirname, "../../src/uploads");
if (!fs_1.default.existsSync(exports.uploadDir)) {
    fs_1.default.mkdirSync(exports.uploadDir, { recursive: true });
}
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, exports.uploadDir);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path_1.default.extname(file.originalname));
        },
    }),
});
postRouter.get("/", postRouter_1.getAllPosts);
postRouter.post("/", middleware_1.authMiddleware, exports.upload.single("image"), postRouter_1.createNewPost);
postRouter.get("/:id", postRouter_1.getPostById);
postRouter.put("/:id", middleware_1.authMiddleware, postRouter_1.updatePostById);
postRouter.put("/:id", middleware_1.authMiddleware, postRouter_1.deletePostById);
exports.default = postRouter;
