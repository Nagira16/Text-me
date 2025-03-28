import { Router } from "express";
import {
  deleteUserById,
  getUser,
  getUserById,
  queryUser,
  updateUserById,
} from "../controllers/userController";
import path from "path";
import multer, { Multer } from "multer";

const userRouter: Router = Router();

//http://localhost:5001/user

const uploadDir = path.join(__dirname, "../../src/uploads");

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

userRouter.get("/", getUser);
userRouter.get("/search", queryUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", upload.single("profile_image"), updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
