import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { parseInvoiceLineItems } from "./parseInvoiceLineItems"; // ✅ new util

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

      // 🧪 Preprocess image for OCR
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

      const lineItems = parseInvoiceLineItems(text);
      const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);

      logToFile(`Page ${i + 1} - Cleaned OCR Text:\n${text}`);
      logToFile(
        `Page ${i + 1} - Line Items:\n${JSON.stringify(lineItems, null, 2)}`
      );
      logToFile(`Page ${i + 1} - Total Amount: ${totalAmount.toFixed(2)}`);

      pages.push({
        page: i + 1,
        text,
        items: lineItems,
        totalAmount: Number(totalAmount.toFixed(2)),
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
