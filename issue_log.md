# Issue Log

| ID | Location | Issue | Explanation | Suggested Fix | Status |
|----|----------|-------|-------------|---------------|--------|
| 1 |  ITEMS | Stray , between items | Creates an empty array slot, so ITEMS[3] is undefined and later code can crash on it | Remove the extra comma | Open |

| 2 | addItem | { "name" = name } | `=` is assignment; object literals need `:`. Syntax error | { name, price } | Open |

| 3 | deleteItem | ITEMS.pop() | Removes the last item no matter which name was passed, which violates the "delete items" requirement | Use findIndex and splice | Open |

| 4 | tax | total() + taxRate | Adds the rate instead of multiplying, so the total is wrong | total() * (1 + taxRate) | Open |

| 5 | deleteItem | ITEMS.indexOf("name"), and idx is never used | Searches for the string "name", so it always returns -1. The result is never used. | ITEMS.findIndex((item) => item.name === name) | Open |

| 6 | total | for (const i of 3) | A number isn't iterable (error), & the hardcoded 3 ignores how many items there are, so the loop would skip the 4th item. | ITEMS.reduce((sum, item) => sum + item.price, 0) | Open |

| 7 | total | total = total + ITEMS[i]["price"] | No local variable is declared, this tries to assign to the function itself & reads it before it has a value. | Declare let sum = 0 and return sum | Open |

| 8 | total / tax | Misleading function names | total() returns the subtotal (no tax) and tax() returns the total with tax. This is unclear code | Rename to subtotal() & totalWithTax(), or add doc comments. If you rename, update the tests too. | Open |

| 9 | tax | `const tax = ` inside function tax | The local variable has the same name as the function, which shadows it and is confusing to read. | Return the value: return total() * (1 + taxRate); | Open |

| 10 | printReceipt | for (const i of ITEMS) then ITEMS[i][name] | `for...of` gives each item, not an index, so ITEMS[i] is wrong. [name] uses an undefined variable instead of the string key "name". | for (const item of ITEMS) and use item.name, item.price | Open |

| 11 | printReceipt | '${ITEMS[i][name]} : $${ITEMS[i][price]}}' | Single quotes don't interpolate. There's also an extra } at the end. | Use backticks: `` ${item.name} : $${item.price.toFixed(2)} `` | Open |

| 12 | printReceipt | String(total) | Passes the function itself, so it prints the function's source code instead of the subtotal. | Call it: total().toFixed(2) | Open |

| 13 | printReceipt | `` `Tax: $ + ${String(taxRate)}"); `` and the Total line | Starts with a backtick and ends with a double quote, so the string never closes. Syntax error. Also `$ +` is meant to be concatenation but is inside the string. | `` Tax: $${taxAmount.toFixed(2)} `` | Open |

| 14 | printReceipt | tax(String(taxRate)) | Passes a string to a function that expects a number. TypeScript type error. | tax(taxRate) | Open |

| 15 | printReceipt | Tax line prints `taxRate` | Shows the rate (like 0.1) instead of the dollar tax amount. Prices also aren't formatted to 2 decimals. | Compute `subtotal * taxRate` and use `.toFixed(2)` | Open |

## Root Cause, Error, Defect, Failure

- **Root cause:** The code was edited with AI and never run, tested, or reviewed, so mistakes were not caught.
- **Error:** The author wrote ITEMS.pop() without handling which item should be removed.
- **Defect:** ITEMS.pop(); in the deleteItem function (receipt.ts, line 23).
- **Failure:** Calling deleteItem("sandwich") removes the last item ("avocado oil") instead, and the sandwich stays on the receipt.