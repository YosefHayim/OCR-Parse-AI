import { NextFunction, Request, Response } from "express";
import { sendAIData } from "../utils/sendAiData";

export const recalculateSpecificPageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recalculateInfoByAI = await sendAIData(JSON.stringify(req.body));

  res.status(200).json({
    status: 200,
    page: recalculateInfoByAI,
  });
};
