import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";

const logFilePath = path.join(
  process.cwd(),
  `ocr-log-${new Date().toJSON().slice(0, 10)}.txt`
);

const logToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
};

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
) => {
  console.log("Extracting data from PNGs...");

  const worker = await createWorker(["eng"]);
  await worker.setParameters({
    tessedit_char_whitelist:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789€.,:-",
    preserve_interword_spaces: "1",
    tessedit_pageseg_mode: "6",
  });

  const pages = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .rotate()
        .grayscale()
        .normalize()
        .threshold(128)
        .sharpen()
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      logToFile(`Page ${i + 1} - Cleaned OCR Text:\n${text}`);

      pages.push({
        page: i + 1,
        text,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    await worker.terminate();
    console.log("Finished OCR for all pages.");
    return pages;
  }
};
