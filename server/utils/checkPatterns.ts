export const checkPatterns = (line: string) => {
  const patterns = [
    // 0. Quantity with decimal before 'pz' (e.g. "12,50 PZ")
    /(\d{1,4}[,.]\d{2})\s*[Pp][Zz]/,

    // 1. After 'pz' (e.g. "PZ 25")
    /[Pp][Zz]\s*(\d{1,4})/,

    // 2. After 'NR' (e.g. "NR 10")
    /[Nn][Rr]\s*(\d{1,4})/,

    // 3. Before 'ND' (e.g. "5,00 ND")
    /(\d{1,4}[,.]\d{2})\s*ND/,

    // 4. Quantity followed by junk before euro (e.g. "180e580 €1.044,00")
    /\b(\d{2,4})\b(?=\D+\€[\d,.]+)/,

    // 5. Quantity before unit price and total price (e.g. "66 11.0 €72600")
    /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*\u20AC[\d,.]+/,

    // 6. Quantity with optional letter prefix before two prices (e.g. "L150 €9.00 €1,350.00")
    /\b[A-Z]?\s*(\d{1,4})\b\s*\u20AC[\d,.]+\s*\u20AC[\d,.]+/,

    // 7. Quantity before unit price and euro (e.g. "125 i €7,50")
    /\b(\d{1,4})\b(?=\s+\w{0,4}?\s*\u20AC[\d,.]+)/,

    // 8. Raw number before euro — FINAL fallback (e.g. "25 €9,50")
    /\b(\d{1,4})\b\s*\u20AC[\d,.]+/,

    // 9. PANTALONE / MAGLIA lines with 'pz' (e.g. "MAGLIA ... 30 PZ")
    /.*\b(?:PANTALONE|MAGLIA)[\w\s-]*?(\d{1,4})\s*[Pp][Zz]/,

    // 10. Fallback: decimal with 2 more numbers (e.g. "15,00 9,99 149,85")
    /^.*?(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,

    // 11. Number after 'N ' (e.g. "N 1027")
    /[Nn]\s+(\d{1,4})(?![a-zA-Z])/,

    // 12. Legacy labels with decimal (e.g. "Q.T.A. 2,50")
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
