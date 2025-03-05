import { Router } from "express";
import {
  createNewComment,
  deleteCommentyUuid,
  getCommentByPostUuid,
  updateCommentByUuid,
} from "../controllers/commentController";

const commentRouter: Router = Router();

// http://localhost:5001/comment

commentRouter.get("/:postId", getCommentByPostUuid);
commentRouter.post("/", createNewComment);
commentRouter.put("/:id", updateCommentByUuid);
commentRouter.get("/:id", deleteCommentyUuid);
