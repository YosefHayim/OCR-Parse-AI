import { execFile } from "child_process";
import { resolveMagickPath } from "./resolveMagicPath";

export const convertPdfToPngs = async (
  pdfPath: string,
  outputDir: string
): Promise<void> => {
  console.log("Files received, converting PDFs to OCR-optimized PNGs...");
  const whichSystemBeingSet = resolveMagickPath()
    .replace(/^cmd:\s*'(.+?)'[\n\r]*$/, "$1")
    .trim();

  await new Promise((resolve, reject) => {
    execFile(
      whichSystemBeingSet,
      [
        "convert",

        // High DPI = better text quality
        "-density",
        "400",

        // Set pixel unit
        "-units",
        "PixelsPerInch",

        // Convert to grayscale (improves OCR clarity)
        "-colorspace",
        "Gray",

        // Remove transparency
        "-alpha",
        "remove",
        "-strip",

        // Enhance contrast and sharpness
        "-contrast",
        "-contrast-stretch",
        "0", // normalize light/dark range
        "-sharpen",
        "0x1.0",

        // Background white
        "-background",
        "white",
        "-flatten",

        // Optional: auto-orient in case of rotated scans
        "-auto-orient",

        pdfPath,

        // Output
        `${outputDir}/page-%d.png`,
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error("ImageMagick convert error:", stderr);
          reject(error);
        } else {
          console.log("PDF successfully converted to OCR-optimized PNGs.");
          resolve(true);
        }
      }
    );
  });
};
