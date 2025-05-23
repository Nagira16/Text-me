import { Router } from "express";

import { authMiddleware } from "../middleware";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getAllPostsByUserId,
  getFollowingUsersAllPosts,
  getPostById,
  updatePostById,
} from "../controllers/postController";
import multer, { Multer } from "multer";
import path from "path";

const postRouter: Router = Router();

//http://localhost:5001/post

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

postRouter.get("/", getAllPosts);
postRouter.get("/user/:userId", getAllPostsByUserId);
postRouter.get("/follow", authMiddleware, getFollowingUsersAllPosts);
postRouter.post("/", authMiddleware, upload.single("image"), createNewPost);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", authMiddleware, updatePostById);
postRouter.delete("/:id", authMiddleware, deletePostById);

export default postRouter;
