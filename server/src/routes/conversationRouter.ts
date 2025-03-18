import { Router } from "express";
import {
  createConversation,
  getAllConversation,
} from "../controllers/conversationController";

const conversationRouter: Router = Router();

conversationRouter.get("/", getAllConversation);
conversationRouter.post("/", createConversation);

export default conversationRouter;
