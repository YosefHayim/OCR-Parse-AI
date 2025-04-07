interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const parseInvoiceLineItems = (text: string): LineItem[] => {
  const lines = text.split("\n");
  const lineItems: LineItem[] = [];

  const regex =
    /^(\d{4,5})?\s+(.+?)\s+(\d{1,3})\s+(\d{1,3}[.,]?\d{0,2})\s+(\d{1,3}[.,]?\d{0,2})$/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [, id, desc, qty, price, total] = match;

      lineItems.push({
        id: id || undefined,
        description: desc.trim(),
        quantity: parseFloat(qty.replace(",", ".")),
        unitPrice: parseFloat(price.replace(",", ".")),
        total: parseFloat(total.replace(",", ".")),
      });
    }
  }

  return lineItems;
};
