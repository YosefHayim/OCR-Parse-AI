export interface QuantityMatch {
  line: string;
  quantity?: number;
}

export const extractLikelyQuantities = (text: string): QuantityMatch[] => {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const results: QuantityMatch[] = [];

  for (const line of lines) {
    const quantity = extractQuantityFromLine(line);
    results.push({ line, quantity });
  }

  return results;
};

function extractQuantityFromLine(line: string): number | undefined {
  const patterns = [
    // 1. Quantity with decimal before 'pz' (e.g., "246,00 pz")
    /(\d{1,4}[,.]\d{2})\s*[Pp][Zz]/,

    // 2. After 'pz'
    /[Pp][Zz]\s*(\d{1,4})/,

    // 3. After 'NR'
    /[Nn][Rr]\s*(\d{1,4})/,

    // 4. Before 'ND'
    /(\d{1,4}[,.]\d{2})\s*ND/,

    // 5. Raw number before euro
    /(?<![A-Za-z])(\d{1,4})\s*€[\d,.]+/,

    // 6. PANTALONE/MAGLIA lines (just use the number before pz)
    /.*\b(?:PANTALONE|MAGLIA)[\w\s-]*?(\d{1,4})\s*[Pp][Zz]/,

    // 7. Fallback: 3-number lines (quantity, unit price, total)
    /^.*?(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,

    // 8. Number after "N "
    /[Nn]\s+(\d{1,4})(?![a-zA-Z])/,

    /(?:\b(?:N\.?|NR|Q\.?T\.?A?\.?|PZ|PEZZI|NR\.?)\s*)(\d{1,4},\d{2})/gi,
  ];

  for (const regex of patterns) {
    const match = line.match(regex);
    if (match) {
      let raw = match[1].replace(",", ".");
      const val = parseFloat(raw);
      if (!isNaN(val)) {
        return Math.round(val); // treat quantity as integer
      }
    }
  }

  return undefined;
}
