import { Router } from "express";
import {
  getMessagesByConversationId,
  sendMessage,
} from "../controllers/messageController";

const messageRouter: Router = Router();

// http://localhost:5001/message

messageRouter.get("/:conversationId", getMessagesByConversationId);
messageRouter.post("/:conversationId", sendMessage);

export default messageRouter;
