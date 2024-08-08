import { Page } from "@playwright/test";

export class TooltipPage {
  readonly page: Page;
  readonly tooltip: any;

  constructor(page: Page) {
    this.page = page;
    this.tooltip = this.page.locator(".tooltip-inner");
  }

  // Hover over the button and ensure the tooltip becomes visible
  async hoverOverButton() {
    await this.page.hover("#toolTipButton");

    for (let i = 0; i < 3; i++) {
      try {
        await this.page.waitForSelector(".tooltip-inner", {
          state: "visible",
          timeout: 7000,
        });
        break;
      } catch (error) {
        if (i === 2) throw error;
        console.warn("Tooltip not found, retrying...");
      }
    }
  }
}
