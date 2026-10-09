Receipt Testing Lab

Lab: Introduction to Testing and Static Testing. This project practices static testing (manual code review and ESLint) and unit testing (Jest) on a small grocery receipt program.

Files
receipt.ts: original program with intentional defects (left unchanged)
fixed_receipt.ts: corrected version of the program
receipt.test.ts: Jest tests (happy-path, unhappy-path, and edge-case)
issue_log.md: defects found by manual review and ESLint, with suggested fixes and status
screenshots/: test and ESLint results before and after the fixes
Setup
bash
npm install
Run
bash
npx jest receipt.test.ts
npx eslint receipt.ts

Tests import from fixed_receipt.ts, so they should all pass. To see the original failures, change the import in receipt.test.ts to ./receipt.

Notes

Tax rates are decimals (0.1 = 10%).