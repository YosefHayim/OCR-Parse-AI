import fs from "fs";

export const sortFilesWithinOutputDir = (outputDir: string) => {
  console.log(`Sorting files within ${outputDir} directory`);

  const files = fs
    .readdirSync(outputDir)
    .filter((f) => f.endsWith(".png"))
    .sort((a, b) => parseInt(a.match(/\d+/)?.[0] || "0") - parseInt(b.match(/\d+/)?.[0] || "0"));
  return files;
};
