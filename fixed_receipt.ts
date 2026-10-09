type Item = { name: string; price: number };

const ITEMS: Item[] = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

export function addItem(name: string, price: number): void {
  if (!name.trim() || !Number.isFinite(price) || price < 0) {
    throw new Error("Invalid item");
  }
  ITEMS.push({ name, price });
}

export function deleteItem(name: string): Item[] {
  const idx = ITEMS.findIndex((item) => item.name === name);
  if (idx !== -1) ITEMS.splice(idx, 1);
  return ITEMS;
}

export function total(): number {
  return ITEMS.reduce((sum, item) => sum + item.price, 0);
}

export function tax(taxRate: number): number {
  return total() * (1 + taxRate);
}

export function printReceipt(taxRate: number): void {
  const subtotal = total();
  const taxAmount = subtotal * taxRate;
  console.log("************************");
  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price.toFixed(2)}`);
  }
  console.log("************************");
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Tax: $${taxAmount.toFixed(2)}`);
  console.log(`Total: $${tax(taxRate).toFixed(2)}`);
}