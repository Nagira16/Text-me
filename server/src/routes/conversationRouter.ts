import { Router } from "express";
import { getConversationById } from "../controllers/conversationController";

const conversationRouter: Router = Router();

conversationRouter.get("/:id", getConversationById);

export default conversationRouter;
