import { execFile } from "child_process";
import { outputDir } from "../app";

export const convertPdfToPngs = async (pdfPath: string): Promise<void> => {
  await new Promise((resolve, reject) => {
    execFile(
      `/opt/homebrew/bin/magick convert -density 400 -units PixelsPerInch -colorspace RGB "${pdfPath}" "${outputDir}/page-%d.png"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("❌ ImageMagick convert error:", stderr);
          reject(error);
        } else {
          console.log("✅ PDF converted to PNGs");
          resolve(true);
        }
      }
    );
  });
};
