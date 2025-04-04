import { Router } from "express";
import {
  checkFollowerByUserId,
  checkFollowingByUserId,
  followUserByUserId,
  getAllFollowerByUserId,
  getAllFollowingByUserId,
} from "../controllers/followController";

const followRouter: Router = Router();

// http://localhost:5001/follow

followRouter.get("/follower", getAllFollowerByUserId);
followRouter.get("/following", getAllFollowingByUserId);
followRouter.get("/following/:userId", checkFollowingByUserId);
followRouter.get("/follower/:userId", checkFollowerByUserId);
followRouter.post("/:userId", followUserByUserId);

export default followRouter;
