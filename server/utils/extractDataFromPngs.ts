import path from "path";
import { logAIToFile, logToFile } from "./loggerFiles";
import { extractQuantitiesFromText } from "./extractQuantityFromText";
import { sendAIImages } from "./sendAiData";

export const extractDataFromPngs = async (
  files: string[],
  outputDir: string
) => {
  console.log("Extracting data from PNGs...");

  const pages = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const isAiValidateQuantity = await sendAIImages(
        files[i],
        outputDir,
        `ספק את הכמויות של הפריטים שאתה מוצא בחשבונית רק של כמות`
      );

      console.log("AI Respose with image proccess: ", isAiValidateQuantity);

      const quantitiesFound = extractQuantitiesFromText(isAiValidateQuantity);

      const totalQuantity = quantitiesFound.reduce(
        (sum, item) => sum + item.value,
        0
      );

      console.log(`totalQuantity`, totalQuantity);

      logToFile(`Page ${
        i + 1
      } | Cleane OCR Text:\n${isAiValidateQuantity}\n | quantity total: ${totalQuantity}
        \n${JSON.stringify(quantitiesFound)}\n`);

      logAIToFile(`Page ${i + 1} - AI Response:\n${isAiValidateQuantity}\n`);

      pages.push({
        page: `עמוד בקובץ: ${i + 1}`,
        totalQuantityOfPage: totalQuantity,
        quantitiesFound: JSON.stringify(quantitiesFound),
        text: isAiValidateQuantity,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    console.log("Finished OCR for all pages.");
    // await worker.terminate();
    return pages;
  }
};
