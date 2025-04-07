import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { convertPdfToPngs } from "../utils/convertPdfToPngs";
import { sortFileswithinOutputDir } from "../utils/sortFilesWithinOutputDir";
import { extractDataFromPngs } from "../utils/extractDataFromPngs";
import path from "path";

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

    console.log("PDF file received", req.file.originalname);

    const outputDir = path.join("images", Date.now().toString());
    fs.mkdirSync(outputDir, { recursive: true });

    await convertPdfToPngs(pdfPath, outputDir);
    const files = sortFileswithinOutputDir(outputDir);
    const pages = await extractDataFromPngs(files, outputDir);

    // Clean outPutDir folder
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({
      status: 200,
      pages,
    });
  } catch (err) {
    console.error("Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
};
