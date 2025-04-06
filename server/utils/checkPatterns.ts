export const checkPatterns = (line) => {
  const quantityIndicators = [
    "Q.ta",
    "pezzi",
    "pz",
    "Quantita",
    "QUANTITAY",
    "rz",
    "EA",
    "QuantitaPrezzoSc",
    "QtaPrezzofSo",
    "MAGLIA",
    "PANTALONI",
  ];

  const rejectKeywords = [
    "totale",
    "total",
    "iva",
    "vat",
    "pagamento",
    "riepilogo",
    "imponibile",
    "nonimponibile",
    "amount",
    "summary",
    "documento",
    "€0,00",
    "€0.00",
    "totalamount",
    "due date",
    "saldo",
    "bonifico",
  ];

  const lowerLine = line.toLowerCase();
  if (rejectKeywords.some((k) => lowerLine.includes(k))) return {};

  const patterns = {
    afterLabel: [
      { name: "afterPZ", condition: /[Pp][Zz]\s*(\d{1,4})/ },
      { name: "afterNR", condition: /[Nn][Rr]\s*(\d{1,4})/ },
      { name: "afterLetterN", condition: /[Nn]\s+(\d{1,4})(?![a-zA-Z])/ },
    ],
    beforeLabel: [
      { name: "beforeND", condition: /(\d{1,4}[,.]?\d{0,2})\s*[Nn][Dd]/ },
      {
        name: "beforeAlphanumEuro",
        condition: /\b(\d{1,4})(?=[a-zA-Z]+[a-zA-Z0-9]*\s*€[\d,.]+)/,
      },
      {
        name: "qtyBeforeEuroAlphanum",
        condition: /\b(\d{1,4})\b(?=[^\d\n\r]{1,10}€(?!0|0,00)[\d,.]{3,10})/,
      },
      {
        name: "numberWithLetterBeforeEuro",
        condition: /\b(\d{1,4})(?!\d)(?=[a-zA-Z]{1,5}\s*€[\d,.]+)/,
      },
    ],
    inline: [
      { name: "tightPackedQtyPZ", condition: /\b(\d{2,4})\s*[Pp][Zz]\b/ },
      {
        name: "qtyEuroTwoValues",
        condition: /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*€[\d,.]+/,
      },
      {
        name: "qtyFollowedByPrices",
        condition: (line) => {
          if (
            !quantityIndicators.some((q) =>
              line.toLowerCase().includes(q.toLowerCase())
            )
          )
            return null;
          return line.match(/\b(\d{1,4})\b\s*(?:€[\d,.]+){1,2}/);
        },
      },
      {
        name: "letterPrefixQtyBefore2Prices",
        condition: /\b[A-Z]?\s*(\d{1,4})\b\s*€[\d,.]+\s*€[\d,.]+/,
      },
      {
        name: "qtyBeforePriceTotal",
        condition: /\b(\d{1,4})\b\s+[\d,.]{1,6}\s*€[\d,.]+/,
      },
      {
        name: "legacyDecimalLabels",
        condition:
          /(?:\b(?:N\.?|NR|Q\.?T\.?A?\.?|PZ|PEZZI|NR\.?)\s*)(\d{1,4},\d{2})/gi,
      },
      {
        name: "qtyBeforeKnownLabel",
        condition: /(\d{1,4})(?=\s*(pezzi|pz|PZ|EA))/i,
      },
      {
        name: "qtyKnownLabelBeforeEuro",
        condition: /(\d{1,4})\s*(pezzi|pz|PZ|EA)\s*[a-zA-Z]*\s*€[\d,.]+/i,
      },
    ],
    spacedNumeric: [
      { name: "standaloneNumber", condition: /^\s*(\d{1,4})\s*$/ },
      {
        name: "threeDecimalsInRow",
        condition: /^(.*?)(\d{1,4}[,.]\d{2})\s+[\d,.]{1,6}\s+[\d,.]{1,6}/,
      },
    ],
    descriptionBased: [
      {
        name: "descriptionFollowedByQtyThenEuro",
        condition: /\b(?:MAGLIA|PANTALONI?)\b[\w\s-]*?(\d{1,4})\s*[€\u20AC]/i,
      },
    ],
  };

  for (const category of Object.values(patterns)) {
    for (const { name, condition } of category) {
      let match;
      if (typeof condition === "function") {
        match = condition(line);
      } else {
        match = line.match(condition);
      }

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
  }

  return {};
};
