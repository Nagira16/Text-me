import { Router } from "express";

import { authMiddleware } from "../middleware";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../controllers/postRouter";

const postRouter: Router = Router();

//http://localhost:5001/post

postRouter.get("/", getAllPosts);
postRouter.post("/", authMiddleware, createNewPost);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", authMiddleware, updatePostById);
postRouter.put("/:id", authMiddleware, deletePostById);

export default postRouter;
