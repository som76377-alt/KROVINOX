import { expect, test } from "@playwright/test";

test("desktop homepage explains the offer and next step above the fold", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /utility, cut with intent/i })).toBeVisible();
  await expect(page.getByText(/independent clothing label developing oversized essentials/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /explore the apparel direction/i }).first()).toHaveAttribute("href", "#apparel");
  await expect(page.getByText(/reference material, not KROVINOX product photography/i)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage-desktop.png"), fullPage: true });
});

test("mobile menu works and page has no horizontal overflow", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "Clothing should earn its place." })).toBeVisible();
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("homepage-mobile.png"), fullPage: true });
});

test("shop routes, legal pages, and favicon exist", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "Clothing in progress." })).toBeVisible();
  await page.getByRole("link", { name: "The oversized tee" }).click();
  await expect(page.getByRole("heading", { name: "The oversized tee" })).toBeVisible();
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

test("kinetic visual system stays decorative, unique, and responsive", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".hero-orbit-mark")).toBeVisible();
  await expect(page.locator(".editorial-caption-track")).toBeVisible();

  const visuals = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const atmosphere = document.querySelector(".site-atmosphere");
    const heading = document.querySelector(".hero h1");
    const ringCount = document.querySelectorAll(".atmosphere-orbit").length;
    return {
      pageBackground: getComputedStyle(document.documentElement).getPropertyValue("--paper").trim(),
      signal: getComputedStyle(document.documentElement).getPropertyValue("--signal").trim(),
      bodyFont: body.fontFamily,
      bodyFontToken: body.getPropertyValue("--font-dm-sans").trim(),
      headingFont: heading ? getComputedStyle(heading).fontFamily : "",
      atmospherePosition: atmosphere ? getComputedStyle(atmosphere).position : "",
      atmospherePointerEvents: atmosphere ? getComputedStyle(atmosphere).pointerEvents : "",
      ringCount,
    };
  });
  expect(visuals.pageBackground.toLowerCase()).toBe("#f2eedf");
  expect(visuals.signal.toLowerCase()).toBe("#d8f36b");
  expect(visuals.bodyFont.toLowerCase()).toContain("dm sans");
  expect(visuals.bodyFontToken).not.toBe("");
  expect(visuals.headingFont.toLowerCase()).toContain("syne");
  expect(visuals.atmospherePosition).toBe("fixed");
  expect(visuals.atmospherePointerEvents).toBe("none");
  expect(visuals.ringCount).toBe(2);
  await page.screenshot({ path: testInfo.outputPath("kinetic-home-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  const overflowReport = await page.evaluate(() => ({
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    offenders: Array.from(document.querySelectorAll("body *")).map((el) => ({ tag: el.tagName, className: typeof el.className === "string" ? el.className : "", right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left), width: Math.round(el.getBoundingClientRect().width) })).filter((el) => el.right > window.innerWidth + 1 || el.left < -1).slice(0, 50),
  }));
  expect(overflowReport.hasOverflow, JSON.stringify(overflowReport)).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("kinetic-home-mobile-320.png"), fullPage: true });
});

test("all decorative and scroll-linked motion is disabled with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const result = await page.evaluate(() => ({
    ringAnimation: getComputedStyle(document.querySelector(".atmosphere-orbit")!).animationName,
    stampAnimation: getComputedStyle(document.querySelector(".hero-orbit-mark svg")!).animationName,
    tickerAnimation: getComputedStyle(document.querySelector(".editorial-caption-track")!).animationName,
    progressDisplay: getComputedStyle(document.querySelector(".site-scroll-progress")!).display,
    revealAnimation: getComputedStyle(document.querySelector(".brand-principles")!).animationName,
  }));
  expect(result.ringAnimation).toBe("none");
  expect(result.stampAnimation).toBe("none");
  expect(result.tickerAnimation).toBe("none");
  expect(result.progressDisplay).toBe("none");
  expect(result.revealAnimation).toBe("none");
});
