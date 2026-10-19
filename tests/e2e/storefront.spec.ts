import { expect, test } from "@playwright/test";

test("homepage explains the portfolio and links to the source-attributed garment study", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /look closer.*design with evidence/i })).toBeVisible();
  await expect(page.getByText(/fashion portfolio built around real garments/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /explore the reference catalog/i })).toHaveAttribute("href", "/shop");
  await expect(page.getByRole("heading", { name: /one garment.*a closer read/i })).toBeVisible();
  await expect(page.getByText(/not a true 3D scan/i)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage-desktop.png"), fullPage: true });
});

test("mobile navigation works and homepage has no horizontal overflow", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "Study the garment. Then design." })).toBeVisible();
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("homepage-mobile.png"), fullPage: true });
});

test("catalog filters men, women, and garment categories", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "Study the garment." })).toBeVisible();
  await expect(page.getByText(/portfolio concept, not an inventory/i)).toBeVisible();
  await expect(page.locator(".catalog-item")).toHaveCount(50);
  await page.getByRole("button", { name: "Women", exact: true }).click();
  await expect(page.locator(".catalog-item")).toHaveCount(25);
  await page.getByRole("button", { name: "Men", exact: true }).click();
  await expect(page.locator(".catalog-item")).toHaveCount(25);
  await page.getByRole("button", { name: "T-shirts", exact: true }).click();
  await expect(page.locator(".catalog-item")).toHaveCount(5);
  await expect(page.getByText("REF-M-TS-01", { exact: true })).toHaveCount(0);
});

test("product detail uses its catalog item and original source link", async ({ page }) => {
  await page.goto("/shop/mens-beige-100-linen-shirt");
  await expect(page.getByRole("heading", { name: "Light Beige Linen Shirt" })).toBeVisible();
  await expect(page.getByText(/Original retailer image \/ reference only/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /open original retailer page/i })).toHaveAttribute("href", /zara\.com/);
  await expect(page.getByText(/Product title identifies 100% linen/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /add to demo bag/i })).toBeVisible();
});

test("catalog photos load and use premium-sized source descriptions", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/shop");
  const images = await page.locator(".catalog-item").evaluateAll(async (items) => {
    const imageNodes = items.map((item) => item.querySelector("img")).filter((image): image is HTMLImageElement => image instanceof HTMLImageElement);
    return await Promise.all(imageNodes.map(async (image) => {
      image.loading = "eager";
      try {
        await image.decode();
      } catch {
        // A decode rejection is recorded as a failed image below.
      }
      return {
        src: image.currentSrc || image.src,
        alt: image.alt,
        title: image.closest(".catalog-item")?.querySelector("h2")?.textContent?.trim() ?? "",
        loaded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
        width: image.naturalWidth,
      };
    }));
  });
  expect(images).toHaveLength(50);
  expect(images.every((image) => image.alt.length >= 25 && image.title.length > 0)).toBe(true);
  expect(images.some((image) => /w=375(?:&|$)|w=%7bwidth%7d/i.test(image.src))).toBe(false);
  expect(images.every((image) => image.src.startsWith("https://"))).toBe(true);
  const failedImages = images.filter((image) => !image.loaded).map(({ title, src }) => ({ title, src }));
  expect(failedImages, JSON.stringify(failedImages, null, 2)).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("catalog-all-images-desktop.png"), fullPage: true });
});

test("checkout does not pretend to work when test credentials are missing", async ({ page }) => {
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Sandbox checkout." })).toBeVisible();
  await expect(page.getByText(/no real order is created/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /open sandbox card checkout/i })).toBeDisabled();
  const response = await page.request.post("/api/checkout/create-order", { data: { items: [{ slug: "mens-beige-100-linen-shirt", quantity: 1 }] } });
  expect([503, 502]).toContain(response.status());
});

test("legal pages and favicon exist", async ({ page }) => {
  await page.goto("/terms");
  await expect(page.getByRole("heading", { name: "Terms and conditions" })).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
  expect((await page.request.get("/icon.svg")).ok()).toBeTruthy();
});

test("no em dash, fake social proof, or CSS gradients", async ({ page }) => {
  await page.goto("/");
  const copy = await page.locator("body").innerText();
  expect(copy).not.toContain("—");
  expect(copy.toLowerCase()).not.toContain("customers served");
  expect(copy.toLowerCase()).not.toContain("made with ai");
  const gradients = await page.locator("body").evaluate((el) =>
    [el, ...Array.from(el.querySelectorAll("*"))].filter((node) => getComputedStyle(node).backgroundImage.includes("gradient(")).length
  );
  expect(gradients).toBe(0);
});

test("kinetic system uses the new typography and remains responsive", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".site-atmosphere")).toBeAttached();
  await expect(page.locator(".atmosphere-orbit")).toHaveCount(2);
  await expect(page.locator(".editorial-caption-track")).toBeVisible();
  const visuals = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const atmosphere = document.querySelector(".site-atmosphere");
    const heading = document.querySelector("#hero-title");
    return {
      background: getComputedStyle(document.documentElement).getPropertyValue("--paper").trim().toLowerCase(),
      bodyFont: body.fontFamily.toLowerCase(),
      headingFont: heading ? getComputedStyle(heading).fontFamily.toLowerCase() : "",
      atmospherePosition: atmosphere ? getComputedStyle(atmosphere).position : "",
      pointerEvents: atmosphere ? getComputedStyle(atmosphere).pointerEvents : "",
      ringCount: document.querySelectorAll(".atmosphere-orbit").length,
    };
  });
  expect(visuals.background).toBe("#f2eedf");
  expect(visuals.bodyFont).toContain("manrope");
  expect(visuals.headingFont).toContain("bodoni moda");
  await expect(page.locator(".study-marker")).toHaveCount(3);
  await expect(page.locator(".study-marker strong")).toHaveCount(3);
  const leaderLine = await page.locator(".study-marker--one").evaluate((node) => getComputedStyle(node, "::after").content);
  expect(leaderLine).toBe("\"\"");
  expect(visuals.atmospherePosition).toBe("fixed");
  expect(visuals.pointerEvents).toBe("none");
  expect(visuals.ringCount).toBe(2);
  await page.screenshot({ path: testInfo.outputPath("catalog-home-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("catalog-home-mobile-320.png"), fullPage: true });
});

test("reduced motion removes continuous decorative motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const result = await page.evaluate(() => ({
    orbit: getComputedStyle(document.querySelector(".atmosphere-orbit")!).animationName,
    ticker: getComputedStyle(document.querySelector(".editorial-caption-track")!).animationName,
    progress: getComputedStyle(document.querySelector(".site-scroll-progress")!).display,
  }));
  expect(result.orbit).toBe("none");
  expect(result.ticker).toBe("none");
  expect(result.progress).toBe("none");
});
