import { Router } from "express";
import {
  deleteUserByUuid,
  getUserByUuid,
  updateUserByUuid,
} from "../controllers/userController";
import { testCheckWork } from "../controllers/testController";

const userRouter: Router = Router();

//http://localhost:5001/user

userRouter.get("/", testCheckWork);
userRouter.get("/:id", getUserByUuid);
userRouter.put("/:id", updateUserByUuid);
userRouter.get("/:id", deleteUserByUuid);

export default userRouter;
