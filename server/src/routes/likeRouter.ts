import { Router } from "express";

import {
  getLikedPostByUserId,
  getLikedUserByPostId,
  toggleLikeByPostId,
} from "../controllers/likeController";

const likeRouter: Router = Router();

// http://localhost:5001/like

likeRouter.get("/", getLikedPostByUserId);
likeRouter.get("/:postId", getLikedUserByPostId);
likeRouter.post("/:postId", toggleLikeByPostId);

export default likeRouter;
