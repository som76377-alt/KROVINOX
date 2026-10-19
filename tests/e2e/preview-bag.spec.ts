import { expect, test } from "@playwright/test";

test("demo items can be saved, updated, and removed without claiming a purchase", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop/mens-beige-100-linen-shirt");
  await page.getByRole("button", { name: /add to demo bag/i }).click();
  await expect(page.getByText(/saved to the portfolio demo bag/i)).toBeVisible();
  await page.getByRole("link", { name: /view demo bag/i }).click();
  await expect(page).toHaveURL(/\/bag$/);
  await expect(page.getByRole("heading", { name: "Your saved references." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Light Beige Linen Shirt" })).toBeVisible();
  await page.getByLabel("Quantity of Light Beige Linen Shirt").selectOption("3");
  await expect(page.getByText("3 demo items saved")).toBeVisible();
  await expect(page.getByRole("heading", { name: "No real order." })).toBeVisible();
  await expect(page.getByRole("link", { name: /continue to sandbox checkout/i })).toBeVisible();
  await page.getByRole("button", { name: /remove light beige linen shirt from demo bag/i }).click();
  await expect(page.getByRole("heading", { name: "Start with a reference." })).toBeVisible();
});

test("empty demo bag points to the catalog", async ({ page }) => {
  await page.goto("/bag");
  await expect(page.getByRole("heading", { name: "Start with a reference." })).toBeVisible();
  await page.locator(".bag-empty").getByRole("link", { name: /explore catalog/i }).click();
  await expect(page).toHaveURL(/\/shop$/);
});

test("bag has no horizontal overflow at narrow mobile or wide desktop sizes", async ({ page }, testInfo) => {
  for (const viewport of [{ width: 320, height: 780 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/bag");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await page.screenshot({ path: testInfo.outputPath(`demo-bag-${viewport.width}.png`), fullPage: true });
  }
});

test("saved demo items survive navigation and reload", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/shop/mens-beige-100-linen-shirt");
  await page.getByRole("button", { name: /add to demo bag/i }).click();
  await page.reload();
  const bagLink = page.getByRole("link", { name: /demo bag, 1 items/i });
  await expect(bagLink).toBeVisible();
  await bagLink.click();
  await expect(page.getByRole("heading", { name: "Light Beige Linen Shirt" })).toBeVisible();
  await expect(page.getByText("1 demo item saved")).toBeVisible();
});
