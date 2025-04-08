import { NextFunction, Request, Response } from "express";

export const recalculateSpecificPageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Recieved to AI controller");
  res.status(200).json({
    status: 200,
    response: "Working on it...",
  });
};
