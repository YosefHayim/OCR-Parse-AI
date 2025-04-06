export const extractQuantityFromLine = (line: string) => {
  const patterns = [
    // 0. Quantity with decimal before 'pz'
    /(\d{1,4}[,.]\d{2})\s*[Pp][Zz]/,

    // 1. After 'pz'
    /[Pp][Zz]\s*(\d{1,4})/,

    // 2. After 'NR'
    /[Nn][Rr]\s*(\d{1,4})/,

    // 3. Before 'ND'
    /(\d{1,4}[,.]\d{2})\s*ND/,

    // 4. Raw number before euro
    /(?<![A-Za-z])(\d{1,4})\s*€[\d,.]+/,

    // 5. PANTALONE/MAGLIA lines
    /.*\b(?:PANTALONE|MAGLIA)[\w\s-]*?(\d{1,4})\s*[Pp][Zz]/,

    // 6. Fallback: 3-number lines
    /^.*?(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,

    // 7. Number after "N "
    /[Nn]\s+(\d{1,4})(?![a-zA-Z])/,

    // 8. Legacy decimal patterns after labels
    /(?:\b(?:N\.?|NR|Q\.?T\.?A?\.?|PZ|PEZZI|NR\.?)\s*)(\d{1,4},\d{2})/gi,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const regex = patterns[i];
    const match = line.match(regex);
    if (match) {
      let raw = match[1].replace(",", ".");
      const val = parseFloat(raw);
      if (!isNaN(val)) {
        return { quantity: Math.round(val), patternIndex: i };
      }
    }
  }

  return {};
};
