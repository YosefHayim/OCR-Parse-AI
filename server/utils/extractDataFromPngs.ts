import { logAIToFile, logToFile } from "./loggerFiles";
import { extractQuantitiesAndTotal } from "./extractQuantityFromText";
import { sendAIImages } from "./sendAiData";
import { promptSupplierNameAndTotalQuantityAndTotalAmount } from "./promptsThatWorks";
import { io } from "../app.js";

export const extractDataFromPngs = async (files: string[], outputDir: string) => {
  console.log("Extracting data from PNGs...");
  const pages = [];
  const totalPages = files.length;
  const stepProgressEachIteration = 100 / totalPages;
  try {
    for (let i = 0; i < files.length; i++) {
      console.log(`Extracting data for png: ${files[i]}`);

      const quantityFoundByAI = await sendAIImages(files[i], outputDir, promptSupplierNameAndTotalQuantityAndTotalAmount);

      const { quantities, total, supplierName } = extractQuantitiesAndTotal(quantityFoundByAI);

      console.log(`Qunatity of Page ${i}: ${quantities} | total in page ${i}: ${total} | Supplier name: ${supplierName}`);
      logToFile(`Qunatity of Page ${i}: ${quantities} | total in page ${i}: ${total} | Supplier name: ${supplierName}`);

      const totalQuantityForCurrentPage = quantities.reduce((sum, q) => sum + q, 0);

      logAIToFile(`AI Response:\nPage:\n ${i + 1}\nQuantity:\n${quantityFoundByAI}\n`);

      io.emit("progress-of-extraction", {
        currentPage: i + 1,
        totalPages,
        percent: Math.round(stepProgressEachIteration * (i + 1)),
      });

      pages.push({
        page: `עמוד בקובץ: ${i + 1}`,
        supplierName,
        text: quantityFoundByAI,
        totalQuantity: totalQuantityForCurrentPage,
        totalPayment: total,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  }
  return pages;
};
