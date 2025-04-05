import fs from "fs";
import path from "path";

export const outputDir = path.join("images", Date.now().toString());
fs.mkdirSync(outputDir, { recursive: true });
