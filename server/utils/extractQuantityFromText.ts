const quantityPatterns = [
  {
    name: "Classic <number>(optional space)pz or pezzi",
    pattern: /\b(\d{1,4})\s?(?:pz|pezzi)\b/gi,
  },
  {
    name: "NR/NT/N followed by <number>",
    pattern: /\b(?:NR|NT|N)\s+(\d{1,4}(?:[.,]\d{1,2})?)\b/gi,
  },
  {
    name: "nN followed by <number>",
    pattern: /\bnN\s+(\d{1,4}(?:[.,]\d{1,2})?)\b/gi,
  },
  {
    name: "`qt` or `ot` in the line → extract nearby numbers",
    pattern: /\b(?:qt|ot)\b.*?(\d{1,4}(?:[.,]\d{1,2})?)/gi,
  },
  {
    name: `Middle value in a sequence like "48,00 6,00 288,00"`,
    pattern:
      /(?:\d{1,4}[.,]\d{2})\s+(\d{1,4}[.,]\d{2})\s+(?:\d{1,4}[.,]\d{2})/gi,
  },
];

export const extractQuantitiesFromText = (text) => {
  const matches = [];

  for (const { name, pattern } of quantityPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const raw = match[1].replace(",", ".");
      const quantity = parseFloat(raw);
      if (!isNaN(quantity)) {
        matches.push({
          value: quantity,
          patternName: name,
          rawMatch: match[0],
          index: match.index,
        });
      }
    }
  }

  return matches;
};
