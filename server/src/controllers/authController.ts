import { Request, Response } from "express";
import {
  LoginInput,
  Payload,
  RegisterInput,
  UserWithoutPassword,
} from "../types";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserByUsername } from "./userController";

const secretKey: string | undefined = process.env.SECRET_KEY;

export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      profile_image,
    }: RegisterInput = req.body;

    const emailExist: UserWithoutPassword | null = await findUserByEmail(
      email.trim()
    );
    if (emailExist) {
      res.status(409).json({ success: false, message: "User Already Exists" });
      return;
    }

    const usernameExist: UserWithoutPassword | null = await findUserByUsername(
      username.trim()
    );
    if (usernameExist) {
      res
        .status(409)
        .json({ success: false, message: "Username Already Taken" });
      return;
    }

    const validatePassword: boolean = validatePasswordLength(password.trim());
    const validateUsername: boolean = validateUsernameLength(username.trim());

    if (!validatePassword || !validateUsername) {
      res.status(400).json({
        success: false,
        message: [
          !validatePassword && "Password must be between 8 and 16 characters.",
          !validateUsername && "Username must be between 4 and 16 characters.",
        ]
          .filter(Boolean)
          .join(" "),
      });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password.trim(), 10);

    await prisma.user.create({
      data: {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        profile_image:
          profile_image?.trim() ||
          "https://cdn-icons-png.flaticon.com/512/8847/8847419.png",
      },
    });

    res.status(201).json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Register",
      result: null,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginInput = req.body;

    const user: User | null = await findUserByEmail(email.trim());
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email Or Password Is Wrong",
      });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(
      password.trim(),
      user.password
    );
    if (!isMatch) {
      res.status(404).json({
        success: false,
        message: "Email Or Password Is Wrong",
      });
      return;
    }

    const payload: Payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      profile_image: user.profile_image,
    };

    if (!secretKey) throw new Error("Secrec Key Undefined");

    const token: string = jwt.sign(payload, secretKey, { expiresIn: "2d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 10800000,
    });

    const userWithoutPassword: Omit<User, "password"> = {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      result: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Login",
      result: null,
    });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Logout",
      result: null,
    });
  }
};

//Sub Function

export const validateUsernameLength = (username: string): boolean => {
  if (username.length <= 4) {
    return false;
  }
  return true;
};

export const validatePasswordLength = (password: string): boolean => {
  if (password.length <= 8 || password.length >= 16) {
    return false;
  }
  return true;
};
