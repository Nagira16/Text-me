import { Router } from "express";
import {
  createNewPost,
  deletePostByUuid,
  getAllPosts,
  getPostByUuid,
  updatePostByUuid,
} from "../controllers/postRouter";
import { authMiddleware } from "../middleware";

const postRouter: Router = Router();

//http://localhost:5001/post

postRouter.get("/", getAllPosts);
postRouter.post("/", authMiddleware, createNewPost);
postRouter.get("/:id", getPostByUuid);
postRouter.put("/:id", authMiddleware, updatePostByUuid);
postRouter.put("/:id", authMiddleware, deletePostByUuid);

export default postRouter;
