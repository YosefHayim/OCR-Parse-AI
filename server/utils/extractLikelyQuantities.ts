export const extractLikelyQuantities = (text: string) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const quantityCandidates: {
    line: string;
    quantity: number;
    unitPrice?: number;
    total?: number;
  }[] = [];

  for (const line of lines) {
    // Look for numeric chunks in the line
    const nums = line.match(/[\d]+([.,]\d{1,2})?/g);

    if (nums && nums.length >= 2) {
      const numericValues = nums.map((n) => parseFloat(n.replace(",", ".")));

      // Heuristics:
      // Quantity should be small-ish (1–500), unitPrice reasonable (0.1–100), total higher
      for (let i = 0; i < numericValues.length - 1; i++) {
        const q = numericValues[i];
        const u = numericValues[i + 1];
        const t = numericValues[i + 2];

        const isValid =
          q > 0 &&
          q < 1000 && // quantity range
          u > 0 &&
          u < 100 && // unit price range
          (!t || t >= q * u - 1); // total should be >= q * unitPrice (with margin)

        if (isValid) {
          quantityCandidates.push({
            line,
            quantity: Math.round(q),
            unitPrice: u,
            total: t,
          });
          break;
        }
      }
    }
  }

  return quantityCandidates;
};
