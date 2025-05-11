import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForLoadState("domcontentloaded");
});

test("change background", async ({ page }) => {
  // Expect to show the default background image
  const backgroundImage = page.getByTestId("background-image");

  await expect(backgroundImage).toHaveAttribute("src", /darkforest/);

  const selectBackgroundButton = page.getByTestId(
    "change-background-dropdown-trigger"
  );

  // Click on the select background button
  await selectBackgroundButton.click();

  // Select the second background
  const background2 = page.getByTestId("Mountainous Sunset");

  await background2.click();

  // Expect to have the background image set to the second image
  await expect(backgroundImage).toHaveAttribute("src", /mountainsunset/);
});
