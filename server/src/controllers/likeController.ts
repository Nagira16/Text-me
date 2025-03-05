import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { LikeWithPost, LikeWithUser, PostWithUser } from "../types";
import { Like, Post } from "@prisma/client";
import { findPostByUuid } from "./postRouter";

export const getLikedPostByUserUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
      });
      return;
    }

    const likes: LikeWithPost[] = await prisma.like.findMany({
      where: {
        user_id,
      },
      include: {
        post: {
          select: {
            id: true,
            content: true,
            photo: true,
            created_at: true,
            likes_count: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Liked Post Found Successfully",
      result: likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Like By User Uuid",
    });
  }
};

export const getLikedUserByPostUuid = async (
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

    const likedUser: LikeWithUser[] = await prisma.like.findMany({
      where: {
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

    res.status(200).json({
      success: true,
      message: "Users Found Successfully",
      result: likedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Liked User By Post Uuid",
    });
  }
};

export const toggleLikeByPostUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const post_id: string = req.params.postId;
  let message: string = "";
  let liked: boolean;
  try {
    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
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

    const likeExsit: Like | null = await prisma.like.findFirst({
      where: {
        user_id,
        post_id: post.id,
      },
    });
    if (likeExsit) {
      await prisma.$transaction([
        prisma.like.delete({
          where: { id: likeExsit.id },
        }),
        prisma.post.update({
          where: { id: post.id },
          data: { likes_count: { decrement: 1 } },
        }),
      ]);

      message = "Like Removed";
      liked = false;
    } else {
      await prisma.$transaction([
        prisma.like.create({ data: { user_id, post_id: post.id } }),
        prisma.post.update({
          where: { id: post.id },
          data: { likes_count: { increment: 1 } },
        }),
      ]);

      message = "Post Liked";
      liked = true;
    }

    res.status(201).json({
      success: true,
      message,
      liked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Toggle Like By Post Uuid ",
    });
  }
};
