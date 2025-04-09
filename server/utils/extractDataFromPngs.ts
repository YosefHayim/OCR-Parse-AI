import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { logAIToFile, logToFile } from "./loggerFiles";
import { extractQuantitiesFromText } from "./extractQuantityFromText";
import { sendAIImages } from "./sendAiData";

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
        .threshold()
        .sharpen()
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      const quantitiesFound = extractQuantitiesFromText(text);

      const totalQuantity = quantitiesFound.reduce(
        (sum, item) => sum + item.value,
        0
      );
      logToFile(`Page ${i + 1} pattern quantity total: ${totalQuantity}`);

      const isAiValidateQuantity = await sendAIImages(
        `processed-${i}.png`,
        outputDir,
        `ענה רק עם המידע הבא מתוך התמונה: שם הספק, סך כל הכמויות, הסכום הכולל ששולם`
      );

      logToFile(`Page ${
        i + 1
      } - Cleane OCR Text:\n${text}\n Qunatities Found Page ${i + 1}
        \n${JSON.stringify(quantitiesFound)}\n`);

      logAIToFile(`Page ${i + 1} - AI Response:\n${isAiValidateQuantity}\n`);

      pages.push({
        page: `עמוד בקובץ: ${i + 1}`,
        quantitiesFound: JSON.stringify(quantitiesFound),
        text: isAiValidateQuantity,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    console.log("Finished OCR for all pages.");
    await worker.terminate();
    return pages;
  }
};
