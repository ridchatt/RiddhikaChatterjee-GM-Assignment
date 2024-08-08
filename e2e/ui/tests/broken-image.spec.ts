import { expect, test } from "../../../base/pom-fixture";

test.describe("Broken Image Tests", () => {
  // Navigate to the broken image page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/broken");
  });

  test("TC02 - Verify broken image", async ({ brokenImagePage }) => {
    const isBroken = await brokenImagePage.isImageBroken();
    expect(isBroken).toBe(true);
  });
});
