import { Page } from '@playwright/test';

export class BrokenImagePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isImageBroken() {
    const image = this.page.locator('img[src="/images/Toolsqa_1.jpg"]');
    const result = await image.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth === 0;
    });
    return result;
  }

}