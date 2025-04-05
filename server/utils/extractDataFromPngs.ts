import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
): Promise<{ page: number; text: string }[]> => {
  console.log("Extracting data from PNGs...");

  const worker = await createWorker("ita");

  const pages: { page: number; text: string }[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .resize({ width: 3420, height: 2214 }) // Increased for detail
        .grayscale()
        .normalize()
        .threshold(150) //  Lowered for clarity
        .sharpen({ sigma: 1, m1: 1.0, m2: 2.0 }) // Added sharpening
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      console.log(`📄 Page ${i + 1} OCR Text:\n`, text.slice(0, 500));
      pages.push({ page: i + 1, text });
    }
  } catch (error) {
    console.error("Error occurred during OCR:", error);
  } finally {
    await worker.terminate();
  }

  return pages;
};
