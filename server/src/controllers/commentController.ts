import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CommentInput, CommentWithUser, PostWithUser } from "../types";
import { findPostByUuid } from "./postRouter";

export const getCommentByPostUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const post_id: string = req.params.postId;

  try {
    const post: PostWithUser | null = await findPostByUuid(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
      return;
    }

    const postComments: CommentWithUser[] = await prisma.comment.findMany({
      where: {
        post_id: post.id,
      },
      include: {
        user: { select: { id: true, username: true, profile_image: true } },
      },
    });

    res.status(200).json({
      success: true,
      message: "Comment Found Successfully",
      result: postComments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Comment By Post Uuid",
    });
  }
};

export const createNewComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { post_id, content }: CommentInput = req.body;

  try {
    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(404).json({
        success: false,
        message: "User Id Not Found",
      });
      return;
    }

    const post: PostWithUser | null = await findPostByUuid(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
      return;
    }

    const newComment: CommentWithUser = await prisma.comment.create({
      data: {
        content,
        user_id,
        post_id: post.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment Created Successfully",
      result: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Create New Comment",
    });
  }
};

export const updateCommentByUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uuid: string = req.params.id;
  const { content }: { content?: string } = req.body;

  try {
    const comment: CommentWithUser | null = await findCommentByUuid(uuid);
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
      return;
    }

    const updatedComment: CommentWithUser = await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: content || comment.content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Comment Updated Successfully",
      result: updatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Update Comment By Uuid",
    });
  }
};

export const deleteCommentyUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const uuid: string = req.params.id;

  try {
    const comment: CommentWithUser | null = await findCommentByUuid(uuid);
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
      return;
    }

    const deletedComment: CommentWithUser = await prisma.comment.delete({
      where: {
        id: comment.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_image: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully",
      result: deletedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Delete Comment By Uuid",
    });
  }
};

// Sub Function

const findCommentByUuid = async (
  uuid: string
): Promise<CommentWithUser | null> => {
  return await prisma.comment.findUnique({
    where: { id: uuid },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profile_image: true,
        },
      },
    },
  });
};
