import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CommentInput, CommentWithUser, PostWithUser } from "../types";
import { findPostById } from "./postRouter";

export const getCommentByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.params.postId;

    const post: PostWithUser | null = await findPostById(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
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
      message: "Server Error: Get Comment By Post Id",
      result: null,
    });
  }
};

export const createNewComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { post_id, content }: CommentInput = req.body;

    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const post: PostWithUser | null = await findPostById(post_id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
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
      result: null,
    });
  }
};

export const updateCommentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comment_id: string = req.params.id;
    const { content }: { content?: string } = req.body;

    const comment: CommentWithUser | null = await findCommentById(comment_id);
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment Not Found",
        result: null,
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
      message: "Server Error: Update Comment By Id",
      result: null,
    });
  }
};

export const deleteCommentyId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comment_id: string = req.params.id;

    const comment: CommentWithUser | null = await findCommentById(comment_id);
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment Not Found",
        result: null,
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
      message: "Server Error: Delete Comment By Id",
      result: null,
    });
  }
};

// Sub Function

const findCommentById = async (
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
