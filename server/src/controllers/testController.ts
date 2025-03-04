import { Request, Response } from "express";

export const testGetToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token: string = req.cookies.token;
  res.status(200).json({ token });
};

export const testCheckWork = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    path: req.path,
    message: "Test check work successful",
  });
};
