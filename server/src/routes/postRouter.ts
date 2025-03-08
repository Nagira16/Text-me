import { Router } from "express";

import { authMiddleware } from "../middleware";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../controllers/postController";
import multer, { Multer } from "multer";
import path from "path";
import fs from "fs";

const postRouter: Router = Router();

//http://localhost:5001/post

export const uploadDir = path.join(__dirname, "../../src/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const upload: Multer = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

postRouter.get("/", getAllPosts);
postRouter.post("/", authMiddleware, upload.single("image"), createNewPost);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", authMiddleware, updatePostById);
postRouter.put("/:id", authMiddleware, deletePostById);

export default postRouter;
