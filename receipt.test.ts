import { addItem, deleteItem, total, tax, printReceipt } from "./fixed_receipt";

describe("receipt", () => {
  afterEach(() => jest.restoreAllMocks());

  // HAPPY PATH
  test("total() sums all item prices", () => {
    expect(total()).toBeCloseTo(47.49, 2);
  });

  test("tax(0.1) returns subtotal plus 10%", () => {
    expect(tax(0.1)).toBeCloseTo(52.24, 2);
  });

  test("addItem adds an item that is counted in the total", () => {
    addItem("milk", 3.5);
    expect(total()).toBeCloseTo(50.99, 2);
    deleteItem("milk");
  });

  test("deleteItem removes the named item, not the last one", () => {
    const result = deleteItem("sandwich");
    expect(result.map((i) => i.name)).not.toContain("sandwich");
    expect(result.map((i) => i.name)).toContain("avocado oil");
    addItem("sandwich", 8.75); // restore
  });

  test("printReceipt prints item lines, subtotal, tax and total", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    printReceipt(0.1);
    const output = log.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("paper towels : $21.99");
    expect(output).toContain("Subtotal: $47.49");
    expect(output).toContain("Total: $52.24");
  });

  // UNHAPPY PATH
  test("deleteItem with a nonexistent name removes nothing", () => {
    const before = deleteItem("not-an-item").length;
    expect(before).toBe(4);
  });

  test("addItem rejects a negative price", () => {
    expect(() => addItem("bad", -5)).toThrow();
  });

  // EDGE CASES
  test("tax(0) equals the subtotal", () => {
    expect(tax(0)).toBeCloseTo(total(), 2);
  });

  test("a free ($0) item does not change the total", () => {
    addItem("sample", 0);
    expect(total()).toBeCloseTo(47.49, 2);
    deleteItem("sample");
  });
});