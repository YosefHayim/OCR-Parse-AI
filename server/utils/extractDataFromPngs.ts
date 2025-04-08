import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { logToFile } from "./loggerFile";
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

      const isAiValidateQuantity = await sendAIImages(
        files[i],
        outputDir,
        `החזר אך ורק את השורה בפורמט הבא, ללא הקדמות, כותרות או טקסט נוסף:
ספק: [שם הספק] | חישוב כמות סופית: [חישוב כמות סופית] | כמות סופית: [כמות סופית] | סכום: [סכום במטבע זר]
${quantitiesFound}`
      );

      logToFile(`Page ${i + 1} - AI Response:\n${isAiValidateQuantity}`);

      console.log("AI Response to matching is: ", isAiValidateQuantity);

      pages.push({
        page: `מספר בקובץ: ${i + 1}`,
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
