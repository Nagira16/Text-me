import { Conversation } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getConversationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const conversation_id = req.params.id;

    const conversation: Conversation | null = await findConversationById(
      conversation_id
    );
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
      message: "Server Error: Get Conversation By Uuid",
    });
  }
};

// Sub Function

const findConversationById = async (
  uuid: string
): Promise<Conversation | null> => {
  return await prisma.conversation.findUnique({
    where: {
      id: uuid,
    },
  });
};
