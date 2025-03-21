import { Router } from "express";
import {
  followUserByUserId,
  getAllFollowerByUserId,
  getAllFollowingByUserId,
} from "../controllers/followController";

const followRouter: Router = Router();

// http://localhost:5001/follow

followRouter.get("/follower", getAllFollowerByUserId);
followRouter.get("/following", getAllFollowingByUserId);
followRouter.post("/:userId", followUserByUserId);

export default followRouter;
