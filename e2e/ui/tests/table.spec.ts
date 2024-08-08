import { getTestData } from "../../../utils/data-utils";

import { test, expect } from "../../../base/pom-fixture";

const testData = getTestData();

test.describe("Table Tests", () => {
  // Navigate to the web tables page before each test
  test.beforeEach(async ({ page, tablePage }) => {
    await page.goto("/elements");
    await page.click("text=Web Tables");
  });

  test("TC01 - Scenario A - Verify user can enter new data into the table", async ({
    tablePage,
  }) => {
    const { firstName, lastName, age, email, salary, department } =
      testData.tableData.newUser;
    await tablePage.fillForm({
      firstName,
      lastName,
      age,
      email,
      salary,
      department,
    });
    await tablePage.submitForm();
    await tablePage.page.waitForSelector(
      `.rt-tr-group div:has-text("${firstName}")`
    );
    const rowData = await tablePage.getRowData(firstName, lastName, email);
    console.log(rowData);
    expect(rowData).toContain(firstName);
    expect(rowData).toContain(lastName);
    expect(rowData).toContain(age.toString());
  });

  test("TC01 - Scenario B - Verify user can edit the row in a table", async ({
    tablePage,
  }) => {
    const { firstName, lastName } = testData.tableData.editUser;
    await tablePage.editRow("Alden", { firstName, lastName });
    const rowData = await tablePage.getRowData(firstName);
    expect(rowData).toContain(firstName);
    expect(rowData).toContain(lastName);
  });
});
