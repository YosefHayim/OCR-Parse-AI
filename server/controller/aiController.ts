import { NextFunction, Request, Response } from "express";

export const organizeDataViaAI = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Proccessing information to be organized");
};
