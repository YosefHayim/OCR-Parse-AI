import path from "path";
import { createWorker, PSM } from "tesseract.js";
import sharp from "sharp";
import { logToFile } from "./loggerFile";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
) => {
  console.log("Extracting data from PNGs...");

  const worker = await createWorker("eng", 1, {
    legacyCore: true,
    legacyLang: true,
  });

  await worker.setParameters({
    tessedit_char_whitelist:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789€.,:-",
    preserve_interword_spaces: "1",
    tessedit_pageseg_mode: PSM.OSD_ONLY,
  });

  const pages = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .resize({ width: 3508, height: 2480 })
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
