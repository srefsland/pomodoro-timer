import { test, expect } from "@playwright/test";

test("Timer Worker", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(1000);

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
  await page.waitForTimeout(1000);

  // Expect to show 25:00 on timer
  await expect(timer).toHaveText("25:00");
});
