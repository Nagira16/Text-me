import { Router } from "express";
import {
  loginUser,
  logout,
  registerNewUser,
} from "../controllers/authController";
import { testGetToken } from "../controllers/testController";
import multer, { Multer } from "multer";
import path from "path";
import { uploadDir } from "../app";

const authRouter: Router = Router();

//http://localhost:5001/auth

const upload: Multer = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

authRouter.get("/", testGetToken);
authRouter.post("/register", upload.single("profile_image"), registerNewUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);

export default authRouter;
