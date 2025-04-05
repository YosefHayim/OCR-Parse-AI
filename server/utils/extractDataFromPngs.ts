import path from "path";
import { createWorker, OEM } from "tesseract.js";
import sharp from "sharp";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
): Promise<{ page: number; text: string }[]> => {
  console.log("Extracting data from PNGs...");

  const worker = await createWorker(["ita"]);

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
        .resize({ width: 3420, height: 2214 }) // Ensure consistent A4 resolution
        .grayscale() // Remove color noise
        .normalize() // Normalize brightness and contrast
        .threshold(50) // Binarize image for better OCR
        .sharpen({ sigma: 1, m1: 1.0, m2: 2.0 }) // Enhance edges and characters
        .toFile(processedPath);

      // Run OCR on the preprocessed image
      const {
        data: { text },
      } = await worker.recognize(processedPath);

      // Post-process OCR text to clean up common issues
      const cleanedText = text
        .replace(/[^\S\r\n]{2,}/g, " ") // replace multiple spaces with a single space (except newlines)
        .replace(/€\s?([0-9]+)([.,])([0-9]{2,})/g, "€$1$2$3") // fix euro formatting
        .replace(/\s([.,])/g, "$1") // remove spaces before punctuation
        .replace(/([A-Za-z])\s([A-Za-z])/g, "$1$2") // fix single-letter spacing errors like "Netto a pagare"
        .trim();

      console.log(`📄 Page ${i + 1} OCR Text:\n`, cleanedText);
      pages.push({ page: i + 1, text });
    }
  } catch (error) {
    console.error("Error occurred during OCR:", error);
  } finally {
    await worker.terminate();
    console.log("Finish extract data from images.");
    return pages;
  }
};
