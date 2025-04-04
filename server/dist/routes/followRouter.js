"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followController_1 = require("../controllers/followController");
const followRouter = (0, express_1.Router)();
// http://localhost:5001/follow
followRouter.get("/follower", followController_1.getAllFollowerByUserId);
followRouter.get("/following", followController_1.getAllFollowingByUserId);
followRouter.get("/following/:userId", followController_1.checkFollowingByUserId);
followRouter.get("/follower/:userId", followController_1.checkFollowerByUserId);
followRouter.post("/:userId", followController_1.followUserByUserId);
exports.default = followRouter;
