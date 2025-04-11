const patterns = {
  quantity: /כמות:\s*(\d{1,4})/g,
  total: /סך תשלום:\s*[€₪]?\s*([\d,.]+)/,
  supplierRegex: /שם הספק[:\s]+([^\n]+)/,
};

export const extractQuantitiesAndTotal = (text) => {
  const quantities = [];
  let match;

  // Extract all quantities
  while ((match = patterns.quantity.exec(text)) !== null) {
    const value = parseInt(match[1].replace(",", ""), 10);
    if (!isNaN(value)) {
      quantities.push(value);
    }
  }

  // Extract total payment
  const totalMatch = text.match(patterns.total);
  const total = totalMatch ? parseFloat(totalMatch[1].replace(/,/g, "").replace("€", "")) : null;

  // Extract supplier name
  const supplierMatch = text.match(patterns.supplierRegex);
  const supplierName = supplierMatch ? supplierMatch[1].trim() : null;

  return {
    quantities,
    total,
    supplierName,
  };
};
