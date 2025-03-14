import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "../types";

const secretKey: string | undefined = process.env.SECRET_KEY;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!secretKey) throw new Error("Secrec Key Undefined");

    const cookieToken: string | undefined = req.cookies?.token;
    const authHeader: string | undefined = req.headers["authorization"];
    const headerToken: string | undefined =
      authHeader && authHeader.split(" ")[1];

    const token: string | undefined = cookieToken || headerToken;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Token not provided",
      });
      return;
    }

    const decode = jwt.verify(token, secretKey) as Payload;

    req.user = decode;

    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Forbidden" });
  }
};
