import { execFile } from "child_process";
import path from "path";
import os from "os";

const runCommand = (command: string, args: string[]) =>
  new Promise<void>((resolve, reject) => {
    execFile(command, args, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command} ${args.join(" ")}`);
        console.error(stderr || error.message);
        reject(error);
      } else {
        console.log(`Command succeeded: ${command} ${args.join(" ")}`);
        resolve();
      }
    });
  });

export const convertPdfToPngs = async (pdfPath: string, outputDir: string): Promise<void> => {
  console.log("Files received, converting PDFs to PNGs...");

  const normalizedPdfPath = path.resolve(pdfPath).replace(/\\/g, "/");
  const normalizedOutputDir = path.resolve(outputDir).replace(/\\/g, "/");
  const isWindows = os.platform() === "win32";
  const command = isWindows ? "magick" : "convert";

  const baseArgs = ["-units", "PixelsPerInch", "-colorspace", "Gray", normalizedPdfPath, `${normalizedOutputDir}/page-%d.png`];

  const tryConvert = async (density: number) => {
    const args = isWindows ? ["convert", "-density", String(density), ...baseArgs] : ["-density", String(density), ...baseArgs];
    console.log(`Trying ImageMagick convert at ${density} DPI...`);
    await runCommand(command, args);
  };

  try {
    // First attempt with high quality
    await tryConvert(300);
  } catch (error) {
    console.warn("First conversion attempt failed. Retrying with lower DPI (150)...");
    try {
      await tryConvert(150);
    } catch (finalError) {
      console.error("Both conversion attempts failed. Consider using `pdftoppm` fallback or checking file.");
      // Optional: rethrow or handle gracefully
      throw finalError;
    }
  }
};
