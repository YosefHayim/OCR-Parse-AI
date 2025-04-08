import { NextFunction, Request, Response } from "express";

export const recalculateSpecificPageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Recieved to AI controller");
};
