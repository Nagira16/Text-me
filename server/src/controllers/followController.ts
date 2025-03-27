import { Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  FollowerWithUser,
  FollowingWithUser,
  UserWithoutPassword,
} from "../types";
import { findUserById } from "./userController";
import { Follow } from "@prisma/client";
import { io } from "../app";

export const getAllFollowerByUserId = async (
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
      message: "Server Error: Get All Follower By User Id",
      result: null,
    });
  }
};

export const getAllFollowingByUserId = async (
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
      message: "Server Error: Get Following By User Id",
      result: null,
    });
  }
};

export const followUserByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const following_id: string = req.params.userId;
    let message: string = "";
    let followed: boolean;

    const follower_id: string | undefined = req.user?.id;
    if (!follower_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const followerUser: UserWithoutPassword | null = await findUserById(
      follower_id
    );

    const followingUser: UserWithoutPassword | null = await findUserById(
      following_id
    );
    if (!followingUser || !followerUser) {
      res.status(404).json({
        success: false,
        message: "User to follow not found",
        result: null,
      });
      return;
    }

    if (follower_id === following_id) {
      res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
        result: null,
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
      followed = false;
    } else {
      await prisma.follow.create({
        data: {
          following_id,
          follower_id,
        },
      });

      message = "User followed successfully";
      followed = true;
    }

    const followerConut: number = await prisma.follow.count({
      where: {
        following_id,
      },
    });

    // update follower count for following user
    const roomName = `profile-${followingUser.id}`;
    io.to(roomName).emit("followerCountUpdate", {
      userId: following_id,
      count: followerConut,
    });

    res.status(200).json({
      success: true,
      message,
      result: null,
      followed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Follow User By User Id",
      result: null,
    });
  }
};

export const checkFollowingByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const following_user_id: string = req.params.userId;

    const user_id: string | undefined = req.user?.id;

    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const user = (await findUserById(
      following_user_id
    )) as UserWithoutPassword | null;
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        result: null,
      });
      return;
    }

    const follow: Follow | null = await prisma.follow.findFirst({
      where: {
        follower_id: user_id,
        following_id: user.id,
      },
    });

    res.status(200).json({
      success: true,
      message: follow ? "Is Following" : "Is Not Following",
      result: follow,
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
