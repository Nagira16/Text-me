"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
//http://localhost:5001/user
userRouter.get("/", userController_1.getUser);
userRouter.get("/search", userController_1.queryUser);
userRouter.get("/:id", userController_1.getUserById);
userRouter.put("/:id", userController_1.updateUserById);
userRouter.get("/:id", userController_1.deleteUserById);
exports.default = userRouter;
