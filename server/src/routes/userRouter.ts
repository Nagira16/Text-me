import { Router } from "express";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const userRouter: Router = Router();

//http://localhost:5001/user

userRouter.get("/", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.get("/:id", deleteUserById);

export default userRouter;
