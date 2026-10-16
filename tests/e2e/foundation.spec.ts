import { expect, test } from "@playwright/test";

test("mobile homepage fits 390px and shows a two-column concept grid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "A study in form. A discipline of detail." })).toBeVisible();
  await expect(page.getByText("Not for sale · Concept fixtures only")).toBeVisible();
  await expect(page.getByRole("list", { name: "KROVINOX concept studies" })).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    columns: getComputedStyle(document.querySelector(".product-grid")!).gridTemplateColumns.trim().split(/\s+/).length,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.columns).toBe(2);
  await expect(page.getByRole("listitem")).toHaveCount(3);
});

test("desktop concept grid starts at three columns", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const columns = await page.locator(".product-grid").evaluate((node) => getComputedStyle(node).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns).toBe(3);
  const family = await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(family.toLowerCase()).toContain("manrope");
});

test("the homepage puts concept cards before the brand-direction section", async ({ page }) => {
  await page.goto("/");
  const cardsTop = await page.locator(".home-studies").evaluate((node) => node.getBoundingClientRect().top);
  const directionTop = await page.locator(".home-direction").evaluate((node) => node.getBoundingClientRect().top);
  expect(cardsTop).toBeLessThan(directionTop);
  await expect(page.getByText(/temporary third-party fashion photographs help test the art direction/i)).toBeVisible();
});

test("the primary CTA routes to a working shop collection page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore concept studies/i }).click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole("heading", { level: 1, name: "Shop" })).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(3);
});

test("a reference-study card opens without a fabricated price or purchase action", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("link", { name: "View Obsidian Layer Study" }).click();
  await expect(page).toHaveURL(/\/products\/form-study-01$/);
  await expect(page.getByRole("heading", { level: 1, name: "Obsidian Layer Study" })).toBeVisible();
  await expect(page.getByText("Concept fixture · Not for sale")).toBeVisible();
  await expect(page.getByText(/temporary third-party Pexels fashion references/i)).toBeVisible();
  await expect(page.getByText(/₹\s?0(?:\.00)?/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: /buy|add to bag|checkout/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Add concept to demo bag" })).toBeDisabled();
  await expect(page.getByText(/material, fit, measurements, size, price, stock and orderability have not been established/i)).toBeVisible();
});

test("product gallery switches concept panels by keyboard and exposes selected state", async ({ page }) => {
  await page.goto("/products/form-study-01");
  const first = page.getByRole("button", { name: "View reference image 1" });
  const second = page.getByRole("button", { name: "View reference image 2" });
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await expect(second).toHaveAttribute("aria-pressed", "false");

  await second.focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(first).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".product-gallery-main img")).toHaveAttribute(
    "alt",
    /Temporary Pexels fashion reference/
  );
});

test("size guide does not invent sizing or garment measurements for a concept fixture", async ({ page }) => {
  await page.goto("/products/form-study-01");
  await page.getByText("Size guide & measurements").click();
  await expect(page.getByText(/no verified garment measurements have been published/i)).toBeVisible();
  await expect(page.getByText(/do not use this preview as size guidance/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Add concept to demo bag" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "View reference image 4" })).toBeVisible();
  await expect(page.getByText(/Reference 1 of 4 · Third-party fashion imagery; not a KROVINOX product/i)).toBeVisible();
});

test("a broken gallery image uses a fallback without breaking the detail layout", async ({ page }) => {
  await page.route("**/photos/6311495/**", (route) => route.abort());
  await page.goto("/products/form-study-01");
  await page.getByRole("button", { name: "View reference image 2" }).click();
  await expect(page.locator(".product-gallery-main .product-image-fallback")).toBeVisible();
  await expect(page.locator(".product-gallery-main")).toContainText("Image unavailable");
});

test("unknown product slugs use a helpful not-found page", async ({ page }) => {
  await page.goto("/products/not-a-real-product");
  await expect(page.getByRole("heading", { level: 1, name: "This page does not exist." })).toBeVisible();
  await expect(page.getByRole("link", { name: /go to shop/i })).toHaveAttribute("href", "/shop");
});

test("about page states only confirmed project facts", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1, name: "About KROVINOX" })).toBeVisible();
  await expect(page.getByText(/manufactured garments, approved artwork, materials or production methods/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /explore concept studies/i })).toHaveAttribute("href", "/shop");
});

test("mobile navigation opens, closes with Escape, and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Shop" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("skip link becomes visible on keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("preview is noindex and the footer does not imply commerce", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("contentinfo")).toContainText("No products for sale");
  await expect(page.getByRole("contentinfo")).toContainText("No orders or payment accepted");
});


test("preview state adds to a persistent demo bag without inventing a price or enabling checkout", async ({ page }) => {
  await page.goto("/products/form-study-01");
  const state = page.getByRole("radio", { name: /Sample state A/ });
  await state.check();
  await expect(page.getByRole("button", { name: "Add concept to demo bag" })).toBeEnabled();
  await page.getByRole("button", { name: "Add concept to demo bag" }).click();

  await expect(page.getByText(/Added Obsidian Layer Study to your demo bag/i)).toBeVisible();
  const headerBag = page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (1)" });
  await expect(headerBag).toBeVisible();
  await headerBag.click();

  await expect(page).toHaveURL(/bag$/);
  await expect(page.getByRole("heading", { level: 1, name: "Bag" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "Obsidian Layer Study" })).toBeVisible();
  await expect(page.getByText("Preview state (not a size): Sample state A")).toBeVisible();
  await expect(page.getByText("No approved price", { exact: true })).toBeVisible();
  await expect(page.getByText(/no approved prices exist for these concept fixtures/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Checkout unavailable" })).toBeDisabled();
  await expect(page.getByText(/does not reserve products or create an order/i)).toBeVisible();

  await page.reload();
  await expect(page.locator(".bag-line")).toHaveCount(1);
  await expect(page.getByText("Preview state (not a size): Sample state A")).toBeVisible();
  await expect(page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (1)" })).toBeVisible();
});

test("bag quantity updates, repeated adds merge, and removing the last line gives the empty state", async ({ page }) => {
  await page.goto("/products/form-study-01");
  await page.getByRole("radio", { name: /Sample state A/ }).check();
  await page.getByRole("button", { name: "Add concept to demo bag" }).click();
  await page.getByRole("button", { name: "Add concept to demo bag" }).click();
  await expect(page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (2)" })).toBeVisible();

  await page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (2)" }).click();
  await expect(page.locator(".bag-line")).toHaveCount(1);
  await expect(page.locator(".bag-quantity-value")).toHaveText("2");
  await page.getByRole("button", { name: "Decrease quantity of Obsidian Layer Study" }).click();
  await expect(page.locator(".bag-quantity-value")).toHaveText("1");
  await page.getByRole("button", { name: "Remove Obsidian Layer Study from bag" }).click();

  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
  await expect(page.getByRole("link", { name: /continue shopping/i })).toHaveAttribute("href", "/shop");
  await expect(page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (0)" })).toBeVisible();
});

test("preview and live bag storage are isolated and malformed saved cart state is ignored", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("krovinox:bag:preview:v1", "{malformed-json");
    localStorage.setItem("krovinox:bag:live:v1", JSON.stringify({
      version: 1,
      mode: "preview",
      lines: [{ productId: "kx-demo-001", variantId: "kx-demo-001-variant-a", quantity: 1 }]
    }));
  });
  await page.reload();
  await expect(page.locator(".site-desktop-nav").getByRole("link", { name: "Bag (0)" })).toBeVisible();
  await page.goto("/bag");
  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
});
