"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const commentRouter = (0, express_1.Router)();
// http://localhost:5001/comment
commentRouter.get("/:postId", commentController_1.getCommentByPostUuid);
commentRouter.post("/", commentController_1.createNewComment);
commentRouter.put("/:id", commentController_1.updateCommentByUuid);
commentRouter.get("/:id", commentController_1.deleteCommentyUuid);
