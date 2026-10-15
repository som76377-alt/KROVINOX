import { readFile } from "node:fs/promises";
import { assertProductionSafe, validateCatalogue } from "../lib/products/catalogue-validation.mjs";

const rootDir = process.cwd();
async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, import.meta.url), "utf8"));
}

const approved = await readJson("../data/products.json");
const demo = await readJson("../data/demo-products.json");
const errors = [
  ...validateCatalogue(approved, { label: "data/products.json", rootDir, approvedOnly: true }),
  ...validateCatalogue(demo, { label: "data/demo-products.json", rootDir, demoOnly: true }),
  ...validateCatalogue([...approved, ...demo], { label: "combined catalogue IDs", rootDir }),
];

try {
  assertProductionSafe(approved, { mode: "production" });
} catch (error) {
  errors.push(error.message);
}

if (errors.length > 0) {
  console.error("Catalogue validation failed:");
  for (const message of errors) console.error("- " + message);
  process.exitCode = 1;
} else {
  console.log("Catalogue validation passed: " + approved.length + " approved record(s), " + demo.length + " isolated demo fixture(s); production guard verified.");
}
