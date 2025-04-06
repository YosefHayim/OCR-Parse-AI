export const checkPatterns = (line: string) => {
  const rejectKeywords = [
    "Totale",
    "Pagamento",
    "Riepilogo",
    "documento",
    "Nonimp",
    "Cartadicredito",
    "Totalamount",
    `${new Date().getFullYear()}`,
    "Tot.tva",
    "Tot,lva",
    "iva",
    ": ...",
    "€0,00",
    "€0.00",
    "inr",
  ];

  if (
    rejectKeywords.some((keyword) =>
      line.toLowerCase().includes(keyword.toLowerCase())
    )
  ) {
    return {};
  }

  const patterns = [
    {
      name: "__",
      regex: /\b(?:PZ|p\d{0,3}|\d{1,3})\s+(\d{1,3})\s+\d{1,3},\d{2}/,
    },
    { name: "leadingQtyInConcatBeforeEuro", regex: /\b(\d{2,3})(?=\d?€)/ },
    { name: "tightPackedQtyPZ", regex: /\b(\d{2,4})\s*[Pp][Zz]\b/ },
    {
      name: "descriptionFollowedByQtyThenEuro",
      regex: /\b(?:MAGLIA|PANTALONI?|MAGUA)\b\s+(\d{1,3})\s+[iI]?\s*[€\u20AC]/i,
    },
    { name: "magliaPzThreeDigit", regex: /\b(\d{3})(?:[,.]00)?\s+pz/i },
    {
      name: "quantityBeforePriceNCode",
      regex:
        /(\d{1,4}[,.]?\d{0,3})[a-z]?\s+[\d,.]{1,6}\s+N\d+[.,]?\d*\s+[\d,.]+/i,
    },
    {
      name: "magliaOrPantaloneWithPz",
      regex: /.*\b(?:PANTALONE|MAGLIA)[\w\s-]*?(\d{1,4})\s*[Pp][Zz]/,
    },
    {
      name: "qtyBeforePriceTotal",
      regex: /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*\u20AC[\d,.]+/,
    },
    {
      name: "letterPrefixQtyBefore2Prices",
      regex: /\b[A-Z]?\s*(\d{1,4})\b\s*\u20AC[\d,.]+\s*\u20AC[\d,.]+/,
    },
    {
      name: "qtyEuroTwoValues",
      regex: /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*€[\d,.]+/,
    },
    {
      name: "qtyBeforeUnitPrice",
      regex: /\b(\d{1,4})\b(?=\s+\w{0,4}?\s*\u20AC[\d,.]+)/,
    },
    { name: "integerFollowedByPZ", regex: /\b(\d{1,4})\s*[Pp][Zz]\b/ },
    { name: "afterPZ", regex: /[Pp][Zz]\s*(\d{1,4})/ },
    { name: "afterNR", regex: /[Nn][Rr]\s*(\d{1,4})/ },
    { name: "beforeND", regex: /(\d{1,4}[,.]\d{2})\s*ND/ },
    { name: "afterLetterN", regex: /[Nn]\s+(\d{1,4})(?![a-zA-Z])/ },
    {
      name: "qtyBeforeEuroAlphanum",
      regex: /\b(\d{1,4})\b(?=[^\d\n\r]{1,10}€(?!0|0,00)[\d,.]{3,10})/,
    },
    {
      name: "beforeAlphanumEuro",
      regex: /\b(\d{1,4})(?=[a-zA-Z]+[a-zA-Z0-9]*\s*€[\d,.]+)/,
    },
    {
      name: "numberWithLetterBeforeEuro",
      regex: /\b(\d{1,4})(?!\d)(?=[a-zA-Z]{1,5}\s*€[\d,.]+)/,
    },
    {
      name: "qtyFollowedByOneOrTwoEuros",
      regex: /\b(\d{1,4})\b\s*(?:€[\d,.]+){1,2}/,
    },
    {
      name: "decimalQtyBeforeEuro",
      regex: /\b(\d{1,4}[.,]\d{2})\b(?=\s*€[\d,.]+(?:\s*€[\d,.]+)?)/,
    },
    {
      name: "legacyDecimalLabels",
      regex:
        /(?:\b(?:N\.?|NR|Q\.?T\.?A?\.?|PZ|PEZZI|NR\.?)\s*)(\d{1,4},\d{2})/gi,
    },
    {
      name: "threeDecimalsInRow",
      regex: /^.*?(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,
    },
    { name: "standaloneNumber", regex: /^\s*(\d{1,4})\s*$/ },
    {
      name: "nonDigitBeforeEuro",
      regex: /\b\D{0,4}\s*(\d{1,4})\s*\u20AC[\d,.]+/,
    },
    {
      name: "rawBeforeSingleEuro",
      regex: /\b(\d{1,4})\b\s*[€\u20AC][\d,.]{2,10}/,
    },
    { name: "rawBeforeEuro", regex: /\b(\d{1,4})\b\s*\u20AC[\d,.]+/ },
  ];

  for (const { name, regex } of patterns) {
    const match = line.match(regex);
    if (match) {
      const raw = match[1].replace(",", ".");
      const val = parseFloat(raw);

      const isLikelyYear = val >= 1900 && val <= 2100;
      const isLikelyDate8Digit = match[0].length === 8;

      if (name === "standaloneNumber") {
        if (val < 10 || val > 999 || isLikelyYear) continue;
      }

      if (!isNaN(val) && !isLikelyYear && !isLikelyDate8Digit) {
        return { quantity: Math.round(val), patternName: name };
      }
    }
  }

  return {};
};
