"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const postController_1 = require("../controllers/postController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const postRouter = (0, express_1.Router)();
//http://localhost:5001/post
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
postRouter.get("/", postController_1.getAllPosts);
postRouter.get("/follow", middleware_1.authMiddleware, postController_1.getFollowingUsersAllPosts);
postRouter.post("/", middleware_1.authMiddleware, upload.single("image"), postController_1.createNewPost);
postRouter.get("/:id", postController_1.getPostById);
postRouter.put("/:id", middleware_1.authMiddleware, postController_1.updatePostById);
postRouter.put("/:id", middleware_1.authMiddleware, postController_1.deletePostById);
exports.default = postRouter;
