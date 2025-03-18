import { Router } from "express";
import {
  deleteUserById,
  getUser,
  getUserById,
  queryUser,
  updateUserById,
} from "../controllers/userController";

const userRouter: Router = Router();

//http://localhost:5001/user

userRouter.get("/", getUser);
userRouter.get("/search", queryUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.get("/:id", deleteUserById);

export default userRouter;
