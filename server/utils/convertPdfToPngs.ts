import { execFile } from "child_process";
import { resolveMagickPath } from "./resolveMagicPath";

export const convertPdfToPngs = async (
  pdfPath: string,
  outputDir: string
): Promise<void> => {
  console.log("Files received, converting PDFs to PNGs...");
  const whichSystemBeingSet = resolveMagickPath()
    .replace(/^cmd:\s*'(.+?)'[\n\r]*$/, "$1")
    .trim();

  await new Promise((resolve, reject) => {
    execFile(
      whichSystemBeingSet,
      [
        "convert",

        // Set input resolution to 300 DPI for better OCR quality
        "-density",
        "300",

        // Use pixel units for accurate scaling
        "-units",
        "PixelsPerInch",

        // Ensure output is in RGB color space
        "-colorspace",
        "Gray",

        // Source PDF file path
        pdfPath,

        // Resize to fit within A4 canvas (3420x2214 pixels)
        "-resize",
        "2480x3508",

        // Center the resized content on the canvas
        "-gravity",
        "center",

        // Strip transparency for better contrast
        "-alpha",
        "remove",
        "-alpha",
        "off",

        // Output PNG file pattern (one per page)
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
