"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../controllers/likeController");
const likeRouter = (0, express_1.Router)();
// http://localhost:5001/like
likeRouter.get("/", likeController_1.getLikedPostByUserUuid);
likeRouter.get("/:postId", likeController_1.getLikedUserByPostUuid);
likeRouter.post("/:postId", likeController_1.toggleLikeByPostUuid);
exports.default = likeRouter;
