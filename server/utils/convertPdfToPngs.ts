import { execFile } from "child_process";

export const convertPdfToPngs = async (
  pdfPath: string,
  outputDir: string
): Promise<void> => {
  console.log("Files recieved converting Pdfs to pngs...");
  await new Promise((resolve, reject) => {
    execFile(
      "/opt/homebrew/bin/magick",
      [
        "convert",
        "-density",
        "600", // Higher DPI for better text clarity
        pdfPath,
        "-colorspace",
        "RGB",
        "-alpha",
        "remove", // Ensures no transparency issues
        "-resize",
        "2480x3508", // A4-size aspect ratio at 300 PPI equivalent
        "-sharpen",
        "0x1", // Mild sharpening for clearer text
        `${outputDir}/page-%d.png`,
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error("ImageMagick convert error:", stderr);
          reject(error);
        } else {
          console.log("PDF converted to PNGs");
          resolve(true);
        }
      }
    );
  });
};
