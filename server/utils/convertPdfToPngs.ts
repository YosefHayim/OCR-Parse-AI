import { execFile } from "child_process";
import path from "path";
import os from "os";

export const convertPdfToPngs = async (pdfPath: string, outputDir: string): Promise<void> => {
  console.log("🧾 Files received, converting PDFs to PNGs...");

  // Use forward slashes to avoid CLI issues with backslashes
  const normalizedPdfPath = path.resolve(pdfPath).replace(/\\/g, "/");
  const normalizedOutputDir = path.resolve(outputDir).replace(/\\/g, "/");

  // Windows requires using "magick convert", Linux just "convert"
  const isWindows = os.platform() === "win32";
  const command = isWindows ? "magick" : "convert";

  // Use magick convert on Windows (two commands), just convert on Linux
  const args = isWindows
    ? [
        "convert",
        "-density",
        "300",
        "-units",
        "PixelsPerInch",
        "-colorspace",
        "Gray",
        normalizedPdfPath,
        `${normalizedOutputDir}/page-%d.png`,
      ]
    : [
        "-density",
        "300",
        "-units",
        "PixelsPerInch",
        "-colorspace",
        "Gray",
        normalizedPdfPath,
        `${normalizedOutputDir}/page-%d.png`,
      ];

  await new Promise<void>((resolve, reject) => {
    execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ ImageMagick convert error:", stderr || error.message);
        reject(error);
      } else {
        console.log("✅ PDF converted to PNGs");
        resolve();
      }
    });
  });
};
