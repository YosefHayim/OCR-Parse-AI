import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { convertPdfToPngs } from "../utils/convertPdfToPngs";
import { sortFileswithinOutputDir } from "../utils/sortFilesWithinOutputDir";
import { extractDataFromPngs } from "../utils/extractDataFromPngs";
import { cleanFolders } from "../utils/cleanFolders";
import { currentDate } from "../utils/getDateWCurrentTime";

export const pdfExtractor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pdfPath = req.file?.path;

    if (!pdfPath) {
      const error = new Error("No PDF file uploaded");
      (error as any).status = 400;
      return next(error);
    }

    console.log("PDF file received", req.file.originalname);

    const outputDir = path.join("images", `${currentDate().date}-${currentDate().time}`);
    fs.mkdirSync(outputDir, { recursive: true });

    await convertPdfToPngs(pdfPath, outputDir);
    const files = sortFileswithinOutputDir(outputDir);
    const pages = await extractDataFromPngs(files, outputDir);

    // const foldersArrayToClean = ["../logs/ai-logs/", "../logs/ocr-logs/", "../images/", "../uploads/"];

    // foldersArrayToClean.forEach((folder) => cleanFolders(folder));

    res.json({
      status: 200,
      pages,
    });
  } catch (err) {
    console.error("Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
};
