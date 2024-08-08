import { Page } from "@playwright/test";

export class DragAndDropPage {
  readonly page: Page;
  readonly dropArea: any;
  readonly dragElement: any;
  readonly dropTarget: any;

  constructor(page: Page) {
    this.page = page;
    this.dragElement = "#draggable";
    this.dropTarget = "#droppable";
    this.dropArea = this.page.locator("#simpleDropContainer p");
  }

  async dragAndDrop() {
    await this.page.waitForSelector(this.dragElement, { state: "visible" });
    await this.page.waitForSelector(this.dropTarget, { state: "visible" });
    await this.page.dragAndDrop(this.dragElement, this.dropTarget);
  }

  async verifyDropSuccess() {
    await await this.dropArea.waitFor({ state: "visible", timeout: 10000 });
    await this.page.waitForFunction(
      () => {
        const element = document.querySelector("#simpleDropContainer p");
        return element?.textContent?.trim() === "Dropped!";
      },
      { timeout: 10000 }
    );

    return this.dropArea;
  }
}
