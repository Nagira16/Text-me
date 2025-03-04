import { Router } from "express";
import {
  loginUser,
  logout,
  registerNewUser,
} from "../controllers/authController";
import { testGetToken } from "../controllers/testController";

const authRouter: Router = Router();

//http://localhost:5001/auth

authRouter.get("/", testGetToken);
authRouter.post("/register", registerNewUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);

export default authRouter;
