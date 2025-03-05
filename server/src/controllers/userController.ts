import { User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { UserUpdateInput } from "../types";
import { validateUsernameLength } from "./authController";

export const getUserById = async (
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

    const user: User | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
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
      message: "Server Error: Get User By Id",
    });
  }
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, profile_image, username }: UserUpdateInput =
      req.body;

    const user_id: string | undefined = req.user?.id;
    if (!user_id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
      });
      return;
    }

    const user: User | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
      return;
    }

    if (username) {
      const validateUsername: boolean = validateUsernameLength(username.trim());
      if (!validateUsername) {
        res.status(400).json({
          success: false,
          message: "Username must be between 4 and 16 characters",
        });
        return;
      }

      const usernameExist: User | null = await findUserByUsername(
        username.trim()
      );
      if (usernameExist) {
        res.status(409).json({
          success: false,
          message: "Username Already Taken",
        });
        return;
      }
    }

    const updatedUser: User = await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name: first_name?.trim() || user.first_name,
        last_name: last_name?.trim() || user.last_name,
        profile_image: profile_image?.trim() || user.profile_image,
        username: username?.trim() || user.username,
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
      });
      return;
    }

    const user: User | null = await findUserById(user_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
      return;
    }

    const deletedUser: User = await prisma.user.delete({
      where: {
        id: user.id,
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
    });
  }
};

//Sub Function

export const findUserById = async (uuid: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id: uuid,
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
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
