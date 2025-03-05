import { Router } from "express";
import {
  getAllFollowerByUserUuid,
  getAllFollowingByUserUuid,
} from "../controllers/followController";

const followRouter: Router = Router();

// http://localhost:5001/follow

followRouter.get("/follower", getAllFollowerByUserUuid);
followRouter.get("/following", getAllFollowingByUserUuid);

export default followRouter;
