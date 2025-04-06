import { checkPatterns } from "./checkPatterns";

export interface QuantityMatch {
  line: string;
  quantity?: number;
  patternIndex?: number;
}

export const extractQuantities = (text: string): QuantityMatch[] => {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const results: QuantityMatch[] = [];

  for (const line of lines) {
    const { quantity, patternIndex } = checkPatterns(line);
    results.push({ line, quantity, patternIndex });
  }

  return results;
};
