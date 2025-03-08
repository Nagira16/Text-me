import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { LikeWithPost, LikeWithUser, PostWithUser } from "../types";
import { Like, Post } from "@prisma/client";
import { findPostById } from "./postController";

export const getLikedPostByUserId = async (
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

    const likedPost: LikeWithPost[] = await prisma.like.findMany({
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
      message: "Liked Posts Found Successfully",
      result: likedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Like By User Id",
      result: null,
    });
  }
};

export const getLikedUserByPostId = async (
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
      message: "Liked Users Found Successfully",
      result: likedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Liked User By Post Id",
      result: null,
    });
  }
};

export const toggleLikeByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.params.postId;
    let message: string = "";
    let liked: boolean;

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

      // notification for author user
      io.to(post.author_id).emit("postLikedNotification", {
        post,
        user_id,
        liked,
      });
    }

    res.status(201).json({
      success: true,
      message,
      liked,
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Toggle Like By Post Id ",
      result: null,
    });
  }
};

export const checkLikedByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id: string = req.body.post_id;

    const user_id: string | undefined = req.user?.id;

    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const post = (await findPostById(post_id)) as Post | null;
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
        result: null,
      });
      return;
    }

    const like: Like | null = await prisma.like.findFirst({
      where: {
        user_id,
        post_id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Like Found Successfully",
      result: like,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Check Liked By Post Id",
      result: null,
    });
  }
};
