import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { extractQuantities } from "./extractQuantities";

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
): Promise<
  {
    page: number;
    text: string;
    quantities: {
      line: string;
      quantity: number;
      unitPrice?: number;
      total?: number;
    }[];
  }[]
> => {
  console.log("Extracting data from PNGs...");

  const worker = await createWorker(["eng"]);

  await worker.setParameters({
    tessedit_char_whitelist:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789€.,:-",
    preserve_interword_spaces: "1",
  });

  const pages: { page: number; text: string }[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      // Preprocess image: resize, grayscale, normalize, threshold, sharpen
      await sharp(originalPath)
        .grayscale() // Remove color noise
        .normalize() // Normalize brightness and contrast
        .threshold(128) // Binarize image for better OCR
        .sharpen() // Enhance edges and characters
        .toFile(processedPath);

      // Run OCR on the preprocessed image
      const {
        data: { text },
      } = await worker.recognize(processedPath);

      // Post-process OCR text to clean up common issues
      const cleanedText = text
        .replace(/[^\S\r\n]{2,}/g, " ") // replace multiple spaces with a single space (except newlines)
        .trim();

      const quantities = extractQuantities(cleanedText);

      logToFile(`📄 Page ${i + 1} - Cleaned OCR Text:\n${cleanedText}`);
      logToFile(
        `🧾 Page ${i + 1} - Extracted Quantities:\n${JSON.stringify(
          quantities,
          null,
          2
        )}`
      );

      console.log(`🧾 Quantities on Page ${i + 1}:\n`, quantities);
      pages.push({ page: i + 1, text: cleanedText, quantities });
    }
  } catch (error) {
    console.error("Error occurred during OCR:", error);
  } finally {
    console.log("Finish extract data from images.");
    await worker.terminate();
    return pages;
  }
};
