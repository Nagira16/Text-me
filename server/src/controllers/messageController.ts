import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { MessageWithUser } from "../types";

export const getMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  try {
    const conversation_id: string = req.params.conversationId;

    const messages: MessageWithUser[] = await prisma.message.findMany({
      where: { conversation_id },
      include: {
        sender: { select: { id: true, username: true, profile_image: true } },
      },
      orderBy: { created_at: "asc" },
    });

    res.status(200).json({ success: true, result: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Messages By Conversation Id",
    });
  }
};
