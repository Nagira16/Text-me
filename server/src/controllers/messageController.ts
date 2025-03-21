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

    res.status(200).json({
      success: true,
      messages: "Message Found Successfully",
      result: messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Messages By Conversation Id",
      result: null,
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { content }: { content: string } = req.body;
    const conversation_id: string = req.params.conversationId;
    const sender_id: string | undefined = req.user?.id;

    if (!sender_id) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized", result: null });
      return;
    }

    const message: MessageWithUser = await prisma.message.create({
      data: {
        sender_id,
        conversation_id,
        content,
      },
      include: {
        sender: { select: { id: true, username: true, profile_image: true } },
      },
    });

    res.status(201).json({
      success: true,
      messages: "Message Created Successfully",
      result: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Send Message",
      result: null,
    });
  }
};
