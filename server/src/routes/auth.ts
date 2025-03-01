import { Request, Response, Router } from "express";
import { loginUser, logout, registerNewUser } from "../controllers/auth";

const router = Router();

//http://localhost:5001/auth

router.get("/", (req: Request, res: Response) => {
  const token = req.cookies.token;
  res.json({ token });
});
router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
