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
        "300",
        "-units",
        "PixelsPerInch",
        "-colorspace",
        "RGB",
        pdfPath,
        "-resize",
        "3420x2214",
        "-gravity",
        "center",
        "-background",
        "white",
        "-extent",
        "3420x2214",
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
