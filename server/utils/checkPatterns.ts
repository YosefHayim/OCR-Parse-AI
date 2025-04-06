export const checkPatterns = (line: string) => {
  const rejectKeywords = [
    "Totale",
    "Pagamento",
    "Riepilogo",
    "documento",
    "Nonimp",
  ];

  if (rejectKeywords.some((keyword) => line.includes(keyword))) {
    return {};
  }

  const patterns = [
    // 0. Integer followed by PZ (e.g. "205pz")
    /\b(\d{1,4})\s*[Pp][Zz]\b/,

    // 1. After 'pz' (e.g. "PZ 25")
    /[Pp][Zz]\s*(\d{1,4})/,

    // 2. After 'NR' (e.g. "NR 10")
    /[Nn][Rr]\s*(\d{1,4})/,

    // 3. Before 'ND' (e.g. "5,00 ND")
    /(\d{1,4}[,.]\d{2})\s*ND/,

    // 4. Quantity followed by letters+digits before euro (e.g. "180e580 €1.044,00")
    /\b(\d{2,4})\b(?=[^\d\n\r]{1,10}€(?!0|0,00)[\d,.]{3,10})/,

    // 5. Quantity between non-digit and euro (e.g. "i 90 €6,20")
    /\b\D{0,4}\s*(\d{1,4})\s*\u20AC[\d,.]+/,

    // 6. Quantity before unit price and total price (e.g. "66 11.0 €72600")
    /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*\u20AC[\d,.]+/,

    // 7. Quantity with optional letter prefix before two prices (e.g. "L150 €9.00 €1,350.00")
    /\b[A-Z]?\s*(\d{1,4})\b\s*\u20AC[\d,.]+\s*\u20AC[\d,.]+/,

    // 8. Quantity before unit price and euro (e.g. "125 i €7,50")
    /\b(\d{1,4})\b(?=\s+\w{0,4}?\s*\u20AC[\d,.]+)/,

    // 9. Raw number before euro — FINAL fallback (e.g. "25 €9,50")
    /\b(\d{1,4})\b\s*\u20AC[\d,.]+/,

    // 10. PANTALONE / MAGLIA lines with 'pz' (e.g. "MAGLIA ... 30 PZ")
    /.*\b(?:PANTALONE|MAGLIA)[\w\s-]*?(\d{1,4})\s*[Pp][Zz]/,

    // 11. Fallback: decimal with 2 more numbers (e.g. "15,00 9,99 149,85")
    /^.*?(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,

    // 12. Number after 'N ' (e.g. "N 1027")
    /[Nn]\s+(\d{1,4})(?![a-zA-Z])/,

    // 13. Legacy labels with decimal (e.g. "Q.T.A. 2,50")
    /(?:\b(?:N\.?|NR|Q\.?T\.?A?\.?|PZ|PEZZI|NR\.?)\s*)(\d{1,4},\d{2})/gi,

    // 14. Raw number before embedded alphanum + euro (e.g. "180e580 €1.044,00")
    /\b(\d{2,4})(?=[a-zA-Z]+[a-zA-Z0-9]*\s*€[\d,.]+)/,

    // 15. Standalone numbers (possibly broken quantity lines)
    /^\s*(\d{1,4})\s*$/,

    // 16. Raw number before single euro
    /\b(\d{1,4})\b\s*[€\u20AC][\d,.]{2,10}/,

    // 17. Quantity followed by one or two euro values
    /\b(\d{1,4})\b\s*(?:€[\d,.]+){1,2}/,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const regex = patterns[i];
    const match = line.match(regex);
    if (match) {
      let raw = match[1].replace(",", ".");
      const val = parseFloat(raw);

      const isLikelyYear = val >= 1900 && val <= 2100;
      const isLikelyDate8Digit = match[0].length === 8;

      // Special filter for pattern 15 (standalone numbers)
      if (i === 15) {
        if (val < 10 || val > 999 || isLikelyYear) {
          continue; // skip low-confidence or noisy numbers
        }
      }

      if (!isNaN(val) && !isLikelyYear && !isLikelyDate8Digit) {
        return { quantity: Math.round(val), patternIndex: i };
      }
    }
  }

  return {};
};
