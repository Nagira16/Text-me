import { Router } from "express";

import {
  getLikedPostByUserUuid,
  getLikedUserByPostUuid,
  toggleLikeByPostUuid,
} from "../controllers/likeController";

const likeRouter: Router = Router();

// http://localhost:5001/like

likeRouter.get("/", getLikedPostByUserUuid);
likeRouter.get("/:postId", getLikedUserByPostUuid);
likeRouter.post("/:postId", toggleLikeByPostUuid);

export default likeRouter;
