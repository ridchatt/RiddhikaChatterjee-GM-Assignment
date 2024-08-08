import { expect, test } from "../../../base/pom-fixture";

test.describe("Drag and Drop Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/droppable");
  });

  test("TC06 - Verify user can drag and drop", async ({ dragAndDropPage }) => {
    await dragAndDropPage.dragAndDrop();
    const droppedSuccess = await dragAndDropPage.verifyDropSuccess();
    expect(droppedSuccess).toHaveText("Dropped!");
  });
});
