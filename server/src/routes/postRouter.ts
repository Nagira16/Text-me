import { Router } from "express";
import {
  createNewPost,
  deletePostByUuid,
  getAllPosts,
  getPostByUuid,
  updatePostByUuid,
} from "../controllers/postRouter";

const postRouter: Router = Router();

//http://localhost:5001/post

postRouter.get("/", getAllPosts);
postRouter.post("/", createNewPost);
postRouter.get("/:id", getPostByUuid);
postRouter.put("/:id", updatePostByUuid);
postRouter.put("/:id", deletePostByUuid);

export default postRouter;
