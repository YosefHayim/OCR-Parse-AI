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
      const quantityFoundByAI = await sendAIImages(
        files[i],
        outputDir,
        `ספק את הכמויות פריטים שאתה מוצא בחשבונית + סך התשלום שיצא`
      );

      // const quantitiesFound = extractQuantitiesFromText(isAiValidateQuantity);

      // const totalQuantity = quantitiesFound.reduce(
      //   (sum, item) => sum + item.value,
      //   0
      // );

      logAIToFile(`Page ${i + 1} - AI Response:\n${quantityFoundByAI}\n`);

      pages.push({
        page: `עמוד בקובץ: ${i + 1}`,
        text: quantityFoundByAI,
      });
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  } finally {
    return pages;
  }
};
