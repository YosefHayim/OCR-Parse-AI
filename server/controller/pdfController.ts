import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { outputDir } from "../app";
import { convertPdfToPngs } from "../utils/convertPdfToPngs";
import { sortFileswithinOutputDir } from "../utils/sortFilesWithinOutputDir";
import { extractDataFromPngs } from "../utils/extractDataFromPngs";

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
    await convertPdfToPngs(pdfPath);
    const files = sortFileswithinOutputDir(outputDir);
    const pages = await extractDataFromPngs(files);

    // 🧹 Clean outPutDir folder
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({ pages });
  } catch (err) {
    console.error("❌ Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
};
