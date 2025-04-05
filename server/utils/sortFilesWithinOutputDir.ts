import fs from "fs";

export const sortFileswithinOutputDir = (outputDir: string) => {
  fs.readdirSync(outputDir)
    .filter((f) => f.endsWith(".png"))
    .sort(
      (a, b) =>
        parseInt(a.match(/\d+/)?.[0] || "0") -
        parseInt(b.match(/\d+/)?.[0] || "0")
    );
};