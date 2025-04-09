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
  {
    name: "Item dash quantity with Hebrew unit",
    pattern: /[-–—]\s*(\d{1,4})\s*(יחידות|חתיכות)\b/g,
  },
  {
    name: "Dash before Hebrew unit quantity",
    pattern: /-\s*(\d{1,4})\s*(יחידות|חתיכות)\b/g,
  },
  {
    name: "Flexible dash before Hebrew quantity",
    pattern: /[-–—]\s*(\d{1,4})\s*(יחידות|חתיכות)\b/g,
  },
  {
    name: "Hebrew label with colon after 'כמות'",
    pattern: /כמות:\s*(\d{1,4})\b/g,
  },
  {
    name: "Loose match for 'כמות: [number]'",
    pattern: /[-–—]?\s*כמות[:\s]\s*(\d{1,4})\b/g,
  },
  {
    name: "Dash before Hebrew unit (item lines only)",
    pattern: /-\s*(\d{1,4})\s*(יחידות|חתיכות)\b/g,
  },
];

export const extractQuantitiesFromText = (text) => {
  text = text
    .replace(/\u200E|\u200F|\u202A-\u202E/g, "") // remove directionality marks
    .replace(/\s+/g, " ") // normalize spaces
    .replace(/,(?!\s)/g, "")
    .trim()
    .split("\n")
    .filter(
      (line) =>
        !line.includes('סה"כ') &&
        !line.includes("סה”כ") &&
        !line.toLowerCase().includes("total")
    );

  const matches = [];
  const usedSpans = new Set(); // Track character ranges to avoid overlap

  for (const { name, pattern } of quantityPatterns) {
    const clonedPattern = new RegExp(pattern.source, pattern.flags);
    let match;

    while ((match = clonedPattern.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Skip if span overlaps any previously matched range
      const spanKey = `${start}-${end}`;
      if (usedSpans.has(spanKey)) continue;
      usedSpans.add(spanKey);

      const raw = match[1].replace(",", ".");
      const quantity = parseFloat(raw);
      if (!isNaN(quantity)) {
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
