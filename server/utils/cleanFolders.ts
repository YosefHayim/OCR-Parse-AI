import fs from "fs";
import path from "path";

export const cleanFolders = (folderToCleanLocation) => {
  console.log("Removing files...");
  const folderToCleanPath = path.resolve(folderToCleanLocation);

  if (!fs.existsSync(folderToCleanPath)) {
    console.warn(`Directory does not exist: ${folderToCleanPath}`);
    return;
  }

  fs.readdirSync(folderToCleanPath).forEach((file) => {
    const filePath = path.join(folderToCleanPath, file);
    fs.rmSync(filePath, { recursive: true, force: true });
  });
};
