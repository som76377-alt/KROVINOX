import { expect, test } from "@playwright/test";

test("mobile homepage feels like a clothing storefront and fits a 390px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "The first collection is taking shape." })).toBeVisible();
  await expect(page.getByText("First collection in progress · Nothing for sale yet")).toBeVisible();
  await expect(page.getByRole("list", { name: "KROVINOX style references" })).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    columns: getComputedStyle(document.querySelector(".product-grid")!).gridTemplateColumns.trim().split(/\s+/).length,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.columns).toBe(2);
  await expect(page.getByRole("listitem")).toHaveCount(3);
});

test("desktop product grid starts at three columns", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const columns = await page.locator(".product-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns).toBe(3);
  const family = await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(family.toLowerCase()).toContain("manrope");
});

test("homepage avoids internal design slogans and gives a clear route to the styles", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /browse the styles/i })).toHaveAttribute("href", "/shop");
  await expect(page.getByRole("heading", { name: "Styles we're exploring" })).toBeVisible();
  await expect(page.getByText(/build the interface around the garment/i)).toHaveCount(0);
  await expect(page.getByText(/temporary third-party fashion photographs help test the art direction/i)).toHaveCount(0);
});

test("primary CTA opens the shop page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /browse the styles/i }).first().click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole("heading", { level: 1, name: "Shop" })).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(3);
});

test("a style reference opens a concise detail page with no fake purchase controls", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("link", { name: "View Oversized black T-shirt" }).click();
  await expect(page).toHaveURL(/\/products\/oversized-black-tee$/);
  await expect(page.getByRole("heading", { level: 1, name: "Oversized black T-shirt" })).toBeVisible();
  await expect(page.getByText("Reference photos · Not for sale")).toBeVisible();
  await expect(page.getByText(/different looks, not multiple views of one garment/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /add to bag|checkout/i })).toHaveCount(0);
  await expect(page.getByRole("radio")).toHaveCount(0);
  await expect(page.getByText(/fit, fabric, construction, pricing and availability are not established/i)).toHaveCount(0);
  await expect(page.getByText(/₹\s?0(?:\.00)?/)).toHaveCount(0);
});

test("gallery switches photos with the keyboard and keeps a clear selected state", async ({ page }) => {
  await page.goto("/products/oversized-black-tee");
  const first = page.getByRole("button", { name: "View photo 1" });
  const second = page.getByRole("button", { name: "View photo 2" });
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await expect(second).toHaveAttribute("aria-pressed", "false");

  await second.focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(first).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".product-gallery-caption")).toHaveText("Reference photo 2 of 3");
});

test("a broken gallery image gets a clear fallback", async ({ page }) => {
  await page.route("**/photos/28758240/**", (route) => route.abort());
  await page.goto("/products/oversized-black-tee");
  await page.getByRole("button", { name: "View photo 2" }).click();
  await expect(page.locator(".product-gallery-main .product-image-fallback")).toBeVisible();
  await expect(page.locator(".product-gallery-main")).toContainText("Image unavailable");
});

test("unknown product slugs use a helpful not-found page", async ({ page }) => {
  await page.goto("/products/not-a-real-product");
  await expect(page.getByRole("heading", { level: 1, name: "This page does not exist." })).toBeVisible();
  await expect(page.getByRole("link", { name: /go to shop/i })).toHaveAttribute("href", "/shop");
});

test("about page explains the current photo references without invented brand claims", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1, name: "About KROVINOX" })).toBeVisible();
  await expect(page.getByText(/photos on this site are styling references, not KROVINOX products/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /browse the styles/i })).toHaveAttribute("href", "/shop");
});

test("mobile menu opens, closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Shop" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("skip link is visible on keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("preview is noindex, has no purchase bag in navigation and keeps honest footer copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("contentinfo")).toContainText("KROVINOX");
  await expect(page.locator(".site-desktop-nav").getByRole("link", { name: /^Bag/ })).toHaveCount(0);
  await page.goto("/bag");
  await expect(page.getByRole("heading", { level: 1, name: "Shopping bag" })).toBeVisible();
  await expect(page.getByText(/shopping bag will be available when the first collection launches/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /checkout|add to bag/i })).toHaveCount(0);
});
