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
        `נתח את החשבונית והחזר את המידע הבא בלבד, בפורמט קבוע ואחיד:

- שורה נפרדת עבור כל פריט עם הכמות שלו בלבד, בפורמט:
כמות: [מספר]

- שורה אחת בסוף עם הסכום הסופי:
סך תשלום: [סכום]

אל תכלול שמות פריטים, תיאורים, מחירים ליחידה או טקסט נוסף. הפלט חייב להיות קבוע בכל הרצה על אותם נתונים.
`
      );

      // const quantitiesFound = extractQuantitiesFromText(isAiValidateQuantity);

      // const totalQuantity = quantitiesFound.reduce(
      //   (sum, item) => sum + item.value,
      //   0
      // );

      console.log(quantityFoundByAI);

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
