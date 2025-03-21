import { Router } from "express";
import {
  checkFollowingByUserId,
  followUserByUserId,
  getAllFollowerByUserId,
  getAllFollowingByUserId,
} from "../controllers/followController";

const followRouter: Router = Router();

// http://localhost:5001/follow

followRouter.get("/follower", getAllFollowerByUserId);
followRouter.get("/following", getAllFollowingByUserId);
followRouter.get("/:userId", checkFollowingByUserId);
followRouter.post("/:userId", followUserByUserId);

export default followRouter;
