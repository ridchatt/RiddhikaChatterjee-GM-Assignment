import { getTestData } from "../../../utils/data-utils";

import { expect, test } from "../../../base/pom-fixture";

const testData = getTestData();

test.describe("Form Submission Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/forms");
    await page.click("text=Practice Form");
  });

  test("TC03 - Verify user can submit the form", async ({ page, formPage }) => {
    const {
      firstName,
      lastName,
      email,
      gender,
      mobile,
      dateOfBirth,
      subjects,
      hobbies,
      picture,
      currentAddress,
      state,
      city,
    } = testData.formData.newRegistration;
    await formPage.fillStudentRegistrationForm({
      firstName,
      lastName,
      email,
      gender,
      mobile,
      dateOfBirth,
      subjects,
      hobbies,
      picture,
      currentAddress,
      state,
      city,
    });
    await formPage.submitForm();
    await page.waitForSelector(".modal-content", {
      state: "visible",
      timeout: 20000,
    });

    const modalContent = await page.locator(".modal-content").textContent();
    expect(modalContent).toContain("Thanks for submitting the form");
  });
});
