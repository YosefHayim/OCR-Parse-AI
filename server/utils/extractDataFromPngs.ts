import path from "path";
import { createWorker } from "tesseract.js";
import { outputDir } from "./locationFile";
import sharp from "sharp";

export const extractDataFromPngs = async (
  files: string[]
): Promise<{ page: number; text: string }[]> => {
  console.log("Extracting data from PNGs...");
  try {
    const worker = await createWorker("eng");

    let pages: { page: number; text: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .resize({ width: 1600 })
        .grayscale()
        .normalize()
        .threshold(160)
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      console.log(`📄 Page ${i + 1} OCR Text:\n`, text.slice(0, 300));
      pages.push({ page: i + 1, text });
    }
    await worker.terminate();
    return pages;
  } catch (error) {
    console.error("Error occurred durnig OCR:", error);
  }
};
