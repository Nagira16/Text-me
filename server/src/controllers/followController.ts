import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { FollowerWithUser, FollowingWithUser } from "../types";
import { findUserByUuid } from "./userController";
import { Follow, User } from "@prisma/client";

export const getAllFollowerByUserUuid = async (
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

    const followers: FollowerWithUser[] = await prisma.follow.findMany({
      where: {
        following_id: user_id,
      },
      include: {
        follower: {
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
      message: "All Followers Found Successfully",
      result: followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get All Follower By User Uuid",
    });
  }
};

export const getAllFollowingByUserUuid = async (
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

    const followings: FollowingWithUser[] = await prisma.follow.findMany({
      where: {
        follower_id: user_id,
      },
      include: {
        following: {
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
      message: "All Following Users Found Successfully",
      result: followings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get Following By User Uuid",
    });
  }
};

export const followUserByUserUuid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const following_id: string = req.params.userId;
  let message: string = "";
  let follow: boolean;
  try {
    const follower_id: string | undefined = req.user?.id;
    if (!follower_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
      });
      return;
    }

    const followingUser: User | null = await findUserByUuid(following_id);
    if (!followingUser) {
      res.status(404).json({
        success: false,
        message: "User to follow not found",
      });
      return;
    }

    if (follower_id === following_id) {
      res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
      return;
    }

    const followExist: Follow | null = await prisma.follow.findFirst({
      where: {
        following_id,
        follower_id,
      },
    });

    if (followExist) {
      await prisma.follow.delete({
        where: {
          id: followExist.id,
        },
      });

      message = "User unfollowed successfully";
      follow = false;
    } else {
      await prisma.follow.create({
        data: {
          following_id,
          follower_id,
        },
      });

      message = "User followed successfully";
      follow = true;
    }

    res.status(200).json({
      success: true,
      message,
      follow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Follow User By User Uuid",
    });
  }
};
