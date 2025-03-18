import { Router } from "express";
import {
  createNewComment,
  deleteCommentyId,
  getCommentByPostId,
  updateCommentById,
} from "../controllers/commentController";
import { authMiddleware } from "../middleware";

const commentRouter: Router = Router();

// http://localhost:5001/comment

commentRouter.get("/:postId", getCommentByPostId);
commentRouter.post("/:postId", authMiddleware, createNewComment);
commentRouter.put("/:id", authMiddleware, updateCommentById);
commentRouter.get("/:id", authMiddleware, deleteCommentyId);

export default commentRouter;
