import { Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  UserInfo,
  UserUpdateInput,
  UserWithoutPassword,
  UserWithPost,
} from "../types";
import { validateUsernameLength } from "./authController";
import { User } from "@prisma/client";

export const getUser = async (req: Request, res: Response): Promise<void> => {
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

    const user: UserWithoutPassword | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        result: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User Found Successfully",
      result: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get User",
      result: null,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: string = req.params.id;

    const user: UserWithPost | null = await prisma.user.findUnique({
      where: { id: user_id },
      omit: { password: true },
      include: {
        post: {
          select: {
            id: true,
            photo: true,
            content: true,
            created_at: true,
            likes_count: true,
            updated_at: true,
          },
        },
      },
    });

    const followerCount: number = await prisma.follow.count({
      where: { following_id: user_id },
    });

    const followingCount: number = await prisma.follow.count({
      where: { follower_id: user_id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        result: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User Found Successfully",
      result: { user, followerCount, followingCount },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Get User By Id",
      result: null,
    });
  }
};

export const queryUser = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({
        success: false,
        message: "Search query is required",
        result: null,
      });
      return;
    }

    const users: UserInfo[] = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        username: true,
        profile_image: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Users Found Successfully",
      result: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Query User",
      result: null,
    });
  }
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, username }: UserUpdateInput = req.body;

    const image: Express.Multer.File | undefined = req.file;

    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
        result: null,
      });
      return;
    }

    const user: UserWithoutPassword | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        result: null,
      });
      return;
    }

    if (username) {
      const validateUsername: boolean = validateUsernameLength(username.trim());
      if (!validateUsername) {
        res.status(400).json({
          success: false,
          message: "Username must be between 4 and 16 characters",
          result: null,
        });
        return;
      }

      const usernameExist: UserWithoutPassword | null =
        await findUserByUsername(username.trim());
      if (usernameExist) {
        res.status(409).json({
          success: false,
          message: "Username Already Taken",
          result: null,
        });
        return;
      }
    }

    const image_url = image
      ? `http://localhost:5001/uploads/${image.filename}`
      : user.profile_image;

    const updatedUser: UserWithoutPassword = await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name: first_name?.trim() || user.first_name,
        last_name: last_name?.trim() || user.last_name,
        profile_image: image_url,
        username: username?.trim() || user.username,
      },
      omit: {
        password: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      result: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Update User By Id",
      result: null,
    });
  }
};

export const deleteUserById = async (
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

    const user: UserWithoutPassword | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        result: null,
      });
      return;
    }

    const deletedUser: UserWithoutPassword = await prisma.user.delete({
      where: {
        id: user.id,
      },
      omit: {
        password: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      result: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Delete User By Id",
      result: null,
    });
  }
};

//Sub Function

export const findUserById = async (
  uuid: string
): Promise<UserWithoutPassword | null> => {
  return await prisma.user.findUnique({
    where: {
      id: uuid,
    },
    omit: {
      password: true,
    },
  });
};

export const findUserByEmailWithoutPassword = async (
  email: string
): Promise<UserWithoutPassword | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    omit: {
      password: true,
    },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByUsername = async (
  username: string
): Promise<UserWithoutPassword | null> => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    omit: {
      password: true,
    },
  });
};
