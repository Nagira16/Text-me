import { Request, Response } from "express";
import { LoginInput, Payload, RegisterInput } from "../types";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey: string | undefined = process.env.SECRET_KEY;

export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  let {
    first_name,
    last_name,
    username,
    email,
    password,
    profile_image,
  }: RegisterInput = req.body;

  first_name = first_name.trim();
  last_name = last_name.trim();
  username = username.trim();
  email = email.trim();
  password = password.trim();

  try {
    const emailExist: User | null = await findUserByEmail(email);
    if (emailExist) {
      res.status(409).json({ success: false, message: "User Already Exists" });
      return;
    }

    const usernameExist: User | null = await findUserByUsername(username);
    if (usernameExist) {
      res
        .status(409)
        .json({ success: false, message: "Username Already Taken" });
      return;
    }

    const result: string | boolean = validatePasswordLength(password);

    if (result !== true) {
      res.status(400).json({
        success: false,
        message: result,
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
        profile_image:
          profile_image ||
          "https://cdn-icons-png.flaticon.com/512/8847/8847419.png",
      },
    });

    res.status(201).json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server Error: Register" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  let { email, password }: LoginInput = req.body;

  email = email.trim();
  password = password.trim();

  try {
    const user: User | null = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email Or Password Is Wrong",
      });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
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

    res.status(200).json({ success: true, message: "Logged In Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Login",
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error: Logout",
    });
  }
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserByUsername = async (username: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

const validatePasswordLength = (
  password: string,
  minLength: number = 8,
  maxLength: number = 16
): string | boolean => {
  if (password.length <= minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (password.length >= maxLength) {
    return `Password must not exceed ${maxLength} characters.`;
  }
  return true;
};
