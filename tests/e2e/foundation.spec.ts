import { expect, test } from "@playwright/test";

test("mobile foundation fits a 390px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Quiet by design. Precise by default." })).toBeVisible();
  await expect(page.getByText("FOUNDATION PREVIEW / NOT A SHOP")).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroFontSize: getComputedStyle(document.querySelector(".hero-title")!).fontSize,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(Number.parseFloat(layout.heroFontSize)).toBeCloseTo(40, 0);
});

test("desktop typography scales without exceeding the defined maximum", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const size = await page.locator(".hero-title").evaluate((node) => getComputedStyle(node).fontSize);
  expect(Number.parseFloat(size)).toBeCloseTo(72, 0);
  const fontFamily = await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(fontFamily.toLowerCase()).toContain("manrope");
});

test("skip link becomes visible on keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("the foundation preview makes no false shop or checkout promise", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/no products, bag, payment or order flow exists/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Checkout is not available" })).toBeDisabled();
  await expect(page.getByLabel("Read-only reference")).toHaveAttribute("readonly", "");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});


test("mobile navigation opens, closes with Escape, and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Preview navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Color system" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("shared shell has working preview navigation and a truthful footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Preview sections" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText("no products for sale");
  await expect(page.getByRole("link", { name: "Back to preview" })).toHaveAttribute("href", "#main-content");
});
