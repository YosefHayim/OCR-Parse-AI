import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const cleanFolders = (folderToCleanLocation) => {
  console.log("Removing files...");
  const folderToCleanPath = path.resolve(__dirname, folderToCleanLocation);

  if (!fs.existsSync(folderToCleanPath)) {
    console.warn(`Directory does not exist: ${folderToCleanPath}`);
    return;
  }

  fs.readdirSync(folderToCleanPath).forEach((file) => {
    const filePath = path.join(folderToCleanPath, file);
    fs.rmSync(filePath, { recursive: true, force: true });
  });
};
