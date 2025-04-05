import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
): Promise<{ page: number; text: string }[]> => {
  console.log("Extracting data from PNGs...");
  try {
    const worker = await createWorker("ita");

    let pages: { page: number; text: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .resize({ width: 2500 })
        .grayscale()
        .normalize()
        .threshold(150)
        .sharpen({ sigma: 1, m1: 1.0, m2: 2.0 })
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      console.log(`📄 Page ${i + 1} OCR Text:\n`, text);
      pages.push({ page: i + 1, text });
    }
    await worker.terminate();

    return pages;
  } catch (error) {
    console.error("Error occurred durnig OCR:", error);
  }
};
