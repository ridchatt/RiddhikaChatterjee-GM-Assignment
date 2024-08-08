import { expect, test } from "../../../base/pom-fixture";

test.describe("Tooltip Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tool-tips");
  });

  test("TC05 - Verify the tooltip", async ({ tooltipPage }) => {
    await tooltipPage.hoverOverButton();
    await expect(tooltipPage.tooltip).toBeVisible();
    await expect(tooltipPage.tooltip).toHaveText("You hovered over the Button");
  });
});
