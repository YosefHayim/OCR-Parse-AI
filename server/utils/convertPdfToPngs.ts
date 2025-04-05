import { execFile } from "child_process";

export const convertPdfToPngs = async (
  pdfPath: string,
  outputDir: string
): Promise<void> => {
  console.log("Files received, converting PDFs to PNGs...");

  await new Promise((resolve, reject) => {
    execFile(
      "/opt/homebrew/bin/magick",
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
        "RGB",

        // Source PDF file path
        pdfPath,

        // Resize to fit within A4 canvas (3420x2214 pixels)
        "-resize",
        "3420x2214",

        // Center the resized content on the canvas
        "-gravity",
        "center",

        // Fill background with white if padding is added
        "-background",
        "white",

        // Extend image to exact A4 dimensions
        "-extent",
        "3420x2214",

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
