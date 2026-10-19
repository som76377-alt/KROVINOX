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
  await expect(page.getByText("Not set", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /remove the oversized tee from preview bag/i }).click();
  await expect(page.getByRole("heading", { name: "Start with a direction." })).toBeVisible();
});

test("empty preview bag points back to apparel", async ({ page }) => {
  await page.goto("/bag");
  await expect(page.getByRole("heading", { name: "Start with a direction." })).toBeVisible();
  await page.locator(".bag-empty").getByRole("link", { name: /explore apparel/i }).click();
  await expect(page).toHaveURL(/\/shop$/);
});

test("bag reflows at narrow mobile and wide desktop widths", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/bag");
  let overflow = await page.evaluate(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(1000, 0);
    const canScrollHorizontally = window.scrollX > 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
    const overflowingContent = Array.from(document.querySelectorAll("main *"))
      .map((el) => ({ tag: el.tagName, className: typeof el.className === "string" ? el.className : "", right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left) }))
      .filter((el) => el.right > window.innerWidth + 1 || el.left < -1);
    return { canScrollHorizontally, overflowingContent };
  });
  expect(overflow.canScrollHorizontally, JSON.stringify(overflow)).toBe(false);
  expect(overflow.overflowingContent, JSON.stringify(overflow)).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("bag-mobile-320.png"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bag");
  overflow = await page.evaluate(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(1000, 0);
    const canScrollHorizontally = window.scrollX > 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
    const overflowingContent = Array.from(document.querySelectorAll("main *"))
      .map((el) => ({ tag: el.tagName, className: typeof el.className === "string" ? el.className : "", right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left) }))
      .filter((el) => el.right > window.innerWidth + 1 || el.left < -1);
    return { canScrollHorizontally, overflowingContent };
  });
  expect(overflow.canScrollHorizontally, JSON.stringify(overflow)).toBe(false);
  expect(overflow.overflowingContent, JSON.stringify(overflow)).toEqual([]);
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

test("editorial motion respects reduced-motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const animationName = await page.locator(".brand-principles").evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
});
