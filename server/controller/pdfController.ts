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
    }

    convertPdfToPngs(pdfPath);
    sortFileswithinOutputDir(outputDir);
    const pages = extractDataFromPngs();

    // 🧹 Clean outPutDir folder
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({ pages });
  } catch (err) {
    console.error("❌ Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
};
