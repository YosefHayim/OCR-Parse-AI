import { checkPatterns } from "./checkPatterns";

export const extractQuantities = (text: string) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/[^\S\r\n]{2,}/g, " ").trim()) // Normalize multi-spaces per line
    .filter((line) => line.length > 0); // Keep only non-empty lines

  const results = [];

  for (const line of lines) {
    const { quantity, patternIndex } = checkPatterns(line);
    results.push({ line, quantity, patternIndex });
  }

  return results;
};
