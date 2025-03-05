import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ConversationWithUser } from "../types";

export const getConversationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const conversation_id = req.params.id;

    const conversation: ConversationWithUser | null =
      await findConversationById(conversation_id);
    if (!conversation) {
      res.status(404).json({
        result: false,
        message: "Conversation Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Conversation Found Successfully",
      result: conversation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Conversation By Id",
    });
  }
};

// Sub Function

const findConversationById = async (
  uuid: string
): Promise<ConversationWithUser | null> => {
  return await prisma.conversation.findUnique({
    where: {
      id: uuid,
    },
    include: {
      user1: {
        select: {
          id: true,
          username: true,
          profile_image: true,
        },
      },
      user2: {
        select: {
          id: true,
          username: true,
          profile_image: true,
        },
      },
    },
  });
};
