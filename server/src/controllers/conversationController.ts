import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ConversationWithUser } from "../types";

export const getAllConversation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const conversations: ConversationWithUser[] =
      await prisma.conversation.findMany({
        where: {
          OR: [{ user1_id: user_id }, { user2_id: user_id }],
        },
        include: {
          user1: { select: { id: true, username: true, profile_image: true } },
          user2: { select: { id: true, username: true, profile_image: true } },
        },
        orderBy: {
          created_at: "desc",
        },
      });

    res.status(200).json({
      success: true,
      message: "All Conversations Found Successfully",
      result: conversations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get All Conversation",
      result: null,
    });
  }
};

export const createConversation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user2_id }: { user2_id: string } = req.body;
    const user1_id: string | undefined = req.user?.id;
    if (!user1_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const existingConversation: ConversationWithUser | null =
      await prisma.conversation.findFirst({
        where: {
          OR: [
            { user1_id, user2_id },
            { user1_id: user2_id, user2_id: user1_id },
          ],
        },
        include: {
          user1: { select: { id: true, username: true, profile_image: true } },
          user2: { select: { id: true, username: true, profile_image: true } },
        },
      });

    if (existingConversation) {
      res.status(200).json({
        success: true,
        message: "Conversation Already Exist",
        result: existingConversation,
      });
      return;
    }

    const conversation: ConversationWithUser = await prisma.conversation.create(
      {
        data: { user1_id, user2_id },
        include: {
          user1: { select: { id: true, username: true, profile_image: true } },
          user2: { select: { id: true, username: true, profile_image: true } },
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Conversations Created Successfully",
      result: conversation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Create Conversation",
      result: null,
    });
  }
};
