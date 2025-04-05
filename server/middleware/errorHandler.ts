import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status;
  const message = err.message;

  res.status(statusCode).json({ error: message });
};
