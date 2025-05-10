import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForLoadState("domcontentloaded");
});
test("Timer Worker", async ({ page }) => {
  // Expect to show 25:00 on timer
  const timer = page.getByTestId("timer-clock");
  // Timer is h1
  await expect(timer).toHaveText("25:00");

  // Click on the start button
  const playPauseButton = page.getByTestId("play-pause");
  await playPauseButton.click();

  // Wait for 2 seconds (add a bit of buffer)
  await page.waitForTimeout(2200);

  // Pause the timer
  await playPauseButton.click();

  // Expect to show 24:58 on timer
  await expect(timer).toHaveText("24:58");

  // Click on the reset button
  const resetButton = page.getByTestId("reset");
  await resetButton.click();

  // Expect to show 25:00 on timer
  await expect(timer).toHaveText("25:00");
});

test("Change background", async ({ page }) => {
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
