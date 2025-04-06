import { checkPatterns } from "./checkPatterns";

export const extractQuantities = (text: string) => {
  const lines = text.split(/\r?\n/);

  const results = [];

  for (let line of lines) {
    const cleanedLine = line.replace(/ {2,}/g, " ").trim(); // Only collapse 2+ spaces, don't touch newlines
    const { quantity, patternName } = checkPatterns(cleanedLine);
    results.push({ line: cleanedLine, quantity, patternName });
  }

  return results;
};
