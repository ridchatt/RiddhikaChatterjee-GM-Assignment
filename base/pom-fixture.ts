import { test as baseTest } from "@playwright/test";
import { BrokenImagePage } from "../e2e/ui/pages/broken-image-page";
import { DragAndDropPage } from "../e2e/ui/pages/drag-and-drop-page";
import { FormPage } from "../e2e/ui/pages/form-page";
import { ProgressBarPage } from "../e2e/ui/pages/progress-bar-page";
import { TablePage } from "../e2e/ui/pages/table-page";
import { TooltipPage } from "../e2e/ui/pages/tooltip-page";

type pages = {
  brokenImagePage: BrokenImagePage;
  dragAndDropPage: DragAndDropPage;
  formPage: FormPage;
  progressBarPage: ProgressBarPage;
  tablePage: TablePage;
  tooltipPage: TooltipPage;
};

const testPages = baseTest.extend<pages>({
  brokenImagePage: async ({ page }, use) => {
    await use(new BrokenImagePage(page));
  },

  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },

  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },

  progressBarPage: async ({ page }, use) => {
    await use(new ProgressBarPage(page));
  },

  tablePage: async ({ page }, use) => {
    await use(new TablePage(page));
  },

  tooltipPage: async ({ page }, use) => {
    await use(new TooltipPage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
