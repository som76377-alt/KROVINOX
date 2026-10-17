import { expect, test } from "@playwright/test";

test("concepts can be saved, updated, and removed without enabling checkout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop/oversized-tee");
  await page.getByRole("button", { name: /add concept to preview bag/i }).click();
  await expect(page.getByText(/added to your preview bag/i)).toBeVisible();
  await page.getByRole("link", { name: /view preview bag/i }).click();
  await expect(page).toHaveURL(/\/bag$/);
  await expect(page.getByRole("heading", { name: "Your saved directions." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The oversized tee" })).toBeVisible();
  await page.getByLabel("Quantity of The oversized tee").selectOption("3");
  await expect(page.getByText("3 concepts saved")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Not available to order." })).toBeVisible();
  await expect(page.getByText("Checkout", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /remove the oversized tee from preview bag/i }).click();
  await expect(page.getByRole("heading", { name: "Start with a direction." })).toBeVisible();
});

test("empty preview bag points back to apparel", async ({ page }) => {
  await page.goto("/bag");
  await expect(page.getByRole("heading", { name: "Start with a direction." })).toBeVisible();
  await page.getByRole("link", { name: /explore apparel/i }).click();
  await expect(page).toHaveURL(/\/shop$/);
});

test("bag reflows at narrow mobile and wide desktop widths", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/bag");
  let overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("bag-mobile-320.png"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bag");
  overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("bag-desktop.png"), fullPage: true });
});

test("saved concepts survive navigation and reload", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/shop/oversized-tee");
  await page.getByRole("button", { name: /add concept to preview bag/i }).click();
  await page.reload();
  const bagLink = page.getByRole("link", { name: /preview bag, 1 items/i });
  await expect(bagLink).toBeVisible();
  await bagLink.click();
  await expect(page.getByRole("heading", { name: "The oversized tee" })).toBeVisible();
  await expect(page.getByText("1 concept saved")).toBeVisible();
});
