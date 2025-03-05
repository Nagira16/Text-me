"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRouter_1 = require("../controllers/postRouter");
const postRouter = (0, express_1.Router)();
//http://localhost:5001/post
postRouter.get("/", postRouter_1.getAllPosts);
postRouter.post("/", postRouter_1.createNewPost);
postRouter.get("/:id", postRouter_1.getPostByUuid);
postRouter.put("/:id", postRouter_1.updatePostByUuid);
postRouter.put("/:id", postRouter_1.deletePostByUuid);
exports.default = postRouter;
