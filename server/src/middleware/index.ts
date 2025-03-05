import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey: string | undefined = process.env.SECRET_KEY;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!secretKey) throw new Error("Secrec Key Undefined");

    const token: string | undefined = req.cookies?.token;
    if (!token) {
      res.status(404).json({
        success: false,
        message: "Token Not Found",
      });
      return;
    }

    jwt.verify(token, secretKey);

    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Forbidden" });
  }
};
