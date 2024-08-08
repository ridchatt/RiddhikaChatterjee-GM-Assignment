import { Page } from "@playwright/test";

export class TablePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    salary: number;
    department: string;
  }) {
    await this.page.click("#addNewRecordButton");
    await this.page.fill("#firstName", data.firstName);
    await this.page.fill("#lastName", data.lastName);
    await this.page.fill("#age", data.age.toString());
    await this.page.fill("#userEmail", data.email);
    await this.page.fill("#salary", data.salary.toString());
    await this.page.fill("#department", data.department);
  }

  async submitForm() {
    await this.page.click("#submit");
  }

  async getRowData(firstName: string, lastName?: string, email?: string) {
    const rowLocator = this.page.locator(
      `.rt-tr-group:has(div:has-text("${firstName}"))`
    );

    if (lastName) {
      rowLocator.locator(`div:has-text("${lastName}")`);
    }
    if (email) {
      rowLocator.locator(`div:has-text("${email}")`);
    }

    await rowLocator.last().waitFor();

    const rowText = await rowLocator.last().textContent();

    return rowText || "";
  }

  async editRow(
    firstName: string,
    data: { firstName: string; lastName: string }
  ) {
    const row = this.page.locator(
      `.rt-tr-group:has-text("${firstName}") >> span[title="Edit"]`
    );
    await row.click();
    await this.page.fill("#firstName", data.firstName);
    await this.page.fill("#lastName", data.lastName);
    await this.page.click("#submit");
  }

  async deleteRow(firstName: string) {
    const row = this.page.locator(
      `.rt-tr-group:has-text("${firstName}") >> button[title="Delete"]`
    );
    await row.click();
  }
}
