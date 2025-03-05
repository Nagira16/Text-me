import { Router } from "express";
import {
  createNewComment,
  deleteCommentyUuid,
  getCommentByPostUuid,
  updateCommentByUuid,
} from "../controllers/commentController";
import { authMiddleware } from "../middleware";

const commentRouter: Router = Router();

// http://localhost:5001/comment

commentRouter.get("/:postId", getCommentByPostUuid);
commentRouter.post("/", authMiddleware, createNewComment);
commentRouter.put("/:id", authMiddleware, updateCommentByUuid);
commentRouter.get("/:id", authMiddleware, deleteCommentyUuid);

export default commentRouter;
