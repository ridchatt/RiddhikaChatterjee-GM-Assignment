import { expect, test } from "../../../base/pom-fixture";

test.describe("Progress Bar Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/progress-bar");
  });

  test("TC04 - Verify the progress bar", async ({ page, progressBarPage }) => {
    await progressBarPage.startProgressBar();
    await progressBarPage.waitForProgressBarComplete();
    await expect(progressBarPage.progressBar).toHaveText("100%");
  });
});
