"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const postRouter_1 = require("../controllers/postRouter");
const postRouter = (0, express_1.Router)();
//http://localhost:5001/post
postRouter.get("/", postRouter_1.getAllPosts);
postRouter.post("/", middleware_1.authMiddleware, postRouter_1.createNewPost);
postRouter.get("/:id", postRouter_1.getPostById);
postRouter.put("/:id", middleware_1.authMiddleware, postRouter_1.updatePostById);
postRouter.put("/:id", middleware_1.authMiddleware, postRouter_1.deletePostById);
exports.default = postRouter;
