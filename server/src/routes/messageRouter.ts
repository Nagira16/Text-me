import { Router } from "express";
import { getMessagesByConversationId } from "../controllers/messageController";

const messageRouter: Router = Router();

// http://localhost:5001/message

messageRouter.get("/:conversationId", getMessagesByConversationId);

export default messageRouter;
