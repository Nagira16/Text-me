"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const testController_1 = require("../controllers/testController");
const userRouter = (0, express_1.Router)();
//http://localhost:5001/user
userRouter.get("/", testController_1.testCheckWork);
userRouter.get("/:id", userController_1.getUserByUuid);
userRouter.put("/:id", userController_1.updateUserByUuid);
userRouter.get("/:id", userController_1.deleteUserByUuid);
exports.default = userRouter;
