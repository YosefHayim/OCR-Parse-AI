const quantityPatterns = [
  {
    name: "Hebrew label with optional prefix before 'כמות' (יחידות or חתיכות)",
    pattern: /כמות(?: נוספת)?:\s*(\d{1,4})\s*(יחידות|חתיכות)/g,
  },
  {
    name: "Number followed by 'חתיכות'",
    pattern: /\b(\d{1,4})\s*חתיכות\b/gi,
  },
  {
    name: "Hebrew quantity with dash or colon",
    pattern: /[-:]\s*(\d{1,4})\s*יחידות\b/g,
  },
  {
    name: "Hebrew label 'כמות נוספת:' followed by number and unit (יחידות only)",
    pattern: /כמות נוספת:\s*(\d{1,4})\s*יחידות/g,
  },
  {
    name: "Number followed by 'pezzi'",
    pattern: /\b(\d{1,4})\s*pezzi\b/gi,
  },
  {
    name: "Number followed by 'unità'",
    pattern: /\b(\d{1,4})\s*unit[àa]\b/gi,
  },
  {
    name: "Number followed by 'pieces'",
    pattern: /\b(\d{1,4})\s*pieces\b/gi,
  },
  {
    name: "Line ending in quantity (Italian style)",
    pattern: /-\s*(\d{1,4})\s*pezzi\b/gi,
  },
  {
    name: "Generic number-unit pattern",
    pattern: /\b(\d{1,4})\s*(pezzi|unit[àa]|pieces|יחידות|חתיכות)\b/gi,
  },
];

export const extractQuantitiesFromText = (text) => {
  text = text
    .replace(/\u200E|\u200F|\u202A-\u202E/g, "") // remove directionality marks
    .replace(/\s+/g, " ") // normalize spaces
    .trim();

  const matches = [];
  const seen = new Set();

  for (const { name, pattern } of quantityPatterns) {
    let clonedPattern = new RegExp(pattern.source, pattern.flags); // Clone to reset state
    let match;

    while ((match = clonedPattern.exec(text)) !== null) {
      const raw = match[1].replace(",", ".");
      const quantity = parseFloat(raw);
      const key = match[0];

      if (!isNaN(quantity) && !seen.has(key)) {
        seen.add(key);
        matches.push({
          value: quantity,
          patternName: name,
          rawMatch: match[0],
        });
      }
    }
  }

  console.log("matches: ", matches);
  return matches;
};
