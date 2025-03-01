import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey: string | undefined = process.env.SECRET_KEY;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!secretKey) throw new Error("Secrec Key Undefined");

    const token: string = req.cookies.token;

    jwt.verify(token, secretKey);

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Forbidden" });
  }
};
