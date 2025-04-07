import { execFile } from "child_process";
import { resolveMagickPath } from "./resolveMagicPath";

export const convertPdfToPngs = async (
  pdfPath: string,
  outputDir: string
): Promise<void> => {
  console.log(
    "Files received, converting PDFs to high-quality PNGs for OCR..."
  );

  const magickPath = resolveMagickPath()
    .replace(/^cmd:\s*'(.+?)'[\n\r]*$/, "$1")
    .trim();

  await new Promise((resolve, reject) => {
    execFile(
      magickPath,
      [
        "convert",

        // High DPI for sharper text rendering
        "-density",
        "300",

        // Use PixelsPerInch to align with DPI
        "-units",
        "PixelsPerInch",

        // Anti-aliasing and rendering quality
        "-quality",
        "100",

        // Flatten layers to avoid transparency issues
        "-flatten",

        // Ensure output is grayscale (OCR works better with mono-tone)
        "-colorspace",
        "Gray",

        // Remove potential noise
        "-filter",
        "Triangle",
        "-resize",
        "2480x3508", // Approx A4 at 300 DPI
        "-unsharp",
        "0x1", // Sharpen to enhance text clarity

        // Source PDF
        pdfPath,

        // Output format with one PNG per page
        `${outputDir}/page-%d.png`,
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error("ImageMagick convert error:", stderr);
          reject(error);
        } else {
          console.log("PDF converted to high-res PNGs for OCR");
          resolve(true);
        }
      }
    );
  });
};
