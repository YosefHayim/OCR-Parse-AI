import { logAIToFile, logToFile } from "./loggerFiles";
import { extractQuantitiesAndTotal } from "./extractQuantityFromText";
import { sendAIImages } from "./sendAiData";
import { promptTwo } from "./promptsThatWorks";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
) => {
  console.log("Extracting data from PNGs...");

  const pages = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const quantityFoundByAI = await sendAIImages(
        files[i],
        outputDir,
        promptTwo
      );

      const { quantities, total } =
        extractQuantitiesAndTotal(quantityFoundByAI);

      const totalQuantity = quantities.reduce((sum, q) => sum + q, 0);

      console.log(
        `Page ${
          i + 1
        } — Quantities: ${quantities}, Total Quantity: ${totalQuantity}, Final Amount: ${total}`
      );

      logAIToFile(`Page ${i + 1} - AI Response:\n${quantityFoundByAI}\n`);
      logToFile(
        `Page ${
          i + 1
        } - Total Quantity: ${totalQuantity}, Final Payment: ${total}\n`
      );

      pages.push({
        page: `עמוד בקובץ: ${i + 1}`,
        text: quantityFoundByAI,
        totalQuantity,
        totalPayment: total,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    return pages;
  }
};
