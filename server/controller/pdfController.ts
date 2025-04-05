import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { convertPdfToPngs } from "../utils/convertPdfToPngs";
import { sortFileswithinOutputDir } from "../utils/sortFilesWithinOutputDir";
import { extractDataFromPngs } from "../utils/extractDataFromPngs";
import path from "path";
import { sendAIData } from "../utils/sendAiData";

export const pdfExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pdfPath = req.file?.path;
    if (!pdfPath) {
      const error = new Error("No PDF file uploaded");
      (error as any).status = 400;
      return next(error);
    }
    console.log("PDF file received");

    const outputDir = path.join("images", Date.now().toString());
    fs.mkdirSync(outputDir, { recursive: true });

    await convertPdfToPngs(pdfPath, outputDir);
    const files = sortFileswithinOutputDir(outputDir);
    const pages = await extractDataFromPngs(files, outputDir);

    const arrangingPagesInfo = await sendAIData(
      `Returned back as a nicley formatted list of current page , supplier name if exist,total quantities per page, total amount paid per page: ${JSON.stringify(
        pages
      )}`
    );

    // Clean outPutDir folder
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({
      status: 200,
      info: arrangingPagesInfo,
    });
  } catch (err) {
    console.error("❌ Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
};
