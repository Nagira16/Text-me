import { Router } from "express";
import { testCheckWork } from "../controllers/testController";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const userRouter: Router = Router();

//http://localhost:5001/user

userRouter.get("/", testCheckWork);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.get("/:id", deleteUserById);

export default userRouter;
