import { Router } from "express";

import {
  checkLikedByPostId,
  getLikedPostByUserId,
  getLikedUserByPostId,
  toggleLikeByPostId,
} from "../controllers/likeController";

const likeRouter: Router = Router();

// http://localhost:5001/like

likeRouter.get("/", getLikedPostByUserId);
likeRouter.get("/:postId", checkLikedByPostId);
likeRouter.get("/user/:postId", getLikedUserByPostId);
likeRouter.post("/:postId", toggleLikeByPostId);

export default likeRouter;
