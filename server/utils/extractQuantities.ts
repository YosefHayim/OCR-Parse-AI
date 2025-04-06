import { checkPatterns } from "./checkPatterns";

export const extractQuantities = (text: string) => {
  const lines = text
    .split(/\r?\n/)
    // .map((line) => line.replace(/[^\S\r\n]{2,}/g, " ").trim())
    .filter((line) => line.length > 0);

  const results = [];

  for (const line of lines) {
    const { quantity, patternName } = checkPatterns(line);
    results.push({ line, quantity, patternName });
  }

  return results;
};
