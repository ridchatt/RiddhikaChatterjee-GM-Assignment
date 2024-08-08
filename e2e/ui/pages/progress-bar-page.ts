import { Page } from "@playwright/test";

export class ProgressBarPage {
  readonly page: Page;
  readonly progressBar: any;

  constructor(page: Page) {
    this.page = page;
    this.progressBar = this.page.locator("#progressBar");
  }

  async startProgressBar() {
    await this.page.click("#startStopButton");
  }

  // Waiting for the progress bar to complete (reach 100%)
  async waitForProgressBarComplete() {
    await this.progressBar.waitFor({ state: "visible", timeout: 30000 });
    await this.page.waitForFunction(
      () => {
        const progressBar = document.querySelector("#progressBar");
        const text = progressBar?.textContent?.trim();
        return text === "100%";
      },
      { timeout: 40000 }
    );
  }
}
