import fs from "fs";
import path from "path";

export const cleanFolders = (outputDir) => {
  console.log("Removing files...");

  fs.readdirSync(outputDir).forEach((file) => {
    const filePath = path.join(outputDir, file);
    fs.rmSync(filePath, { recursive: true, force: true });
  });
};
