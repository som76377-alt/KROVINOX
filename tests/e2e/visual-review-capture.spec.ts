import { expect, test } from "@playwright/test";

/**
 * Captures actual rendered pages in CI so visual review is evidence-based.
 * Screenshots are stored as workflow artifacts, not committed as code assets.
 */
test("visual review capture: desktop home", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage-desktop.png"), fullPage: true, animations: "disabled" });
});

test("visual review capture: mobile home", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage-mobile.png"), fullPage: true, animations: "disabled" });
});

test("visual review capture: desktop shop", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/shop");
  await expect(page.getByRole("heading", { level: 1, name: "Shop" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("shop-desktop.png"), fullPage: true, animations: "disabled" });
});
