"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../controllers/likeController");
const likeRouter = (0, express_1.Router)();
// http://localhost:5001/like
likeRouter.get("/", likeController_1.getLikedPostByUserId);
likeRouter.get("/:postId", likeController_1.checkLikedByPostId);
likeRouter.get("/user/:postId", likeController_1.getLikedUserByPostId);
likeRouter.post("/:postId", likeController_1.toggleLikeByPostId);
exports.default = likeRouter;
