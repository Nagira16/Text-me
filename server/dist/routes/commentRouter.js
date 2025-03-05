"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const middleware_1 = require("../middleware");
const commentRouter = (0, express_1.Router)();
// http://localhost:5001/comment
commentRouter.get("/:postId", commentController_1.getCommentByPostId);
commentRouter.post("/", middleware_1.authMiddleware, commentController_1.createNewComment);
commentRouter.put("/:id", middleware_1.authMiddleware, commentController_1.updateCommentById);
commentRouter.get("/:id", middleware_1.authMiddleware, commentController_1.deleteCommentyId);
exports.default = commentRouter;
