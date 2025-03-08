import { Router } from "express";
import {
  deleteUserById,
  getUser,
  updateUserById,
} from "../controllers/userController";

const userRouter: Router = Router();

//http://localhost:5001/user

userRouter.get("/", getUser);
userRouter.put("/:id", updateUserById);
userRouter.get("/:id", deleteUserById);

export default userRouter;
