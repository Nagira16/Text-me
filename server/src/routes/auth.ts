import { Router } from "express";
import { registerNewUser } from "../controllers/auth";

const router = Router();

//http://localhost:5001/auth

router.post("/register", registerNewUser);
