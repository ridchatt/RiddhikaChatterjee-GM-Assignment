import { Page } from "@playwright/test";

export class FormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Fills out the student registration form with the provided data
  async fillStudentRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    dateOfBirth: string;
    subjects: string[];
    hobbies: string[];
    picture: string;
    currentAddress: string;
    state: string;
    city: string;
  }) {
    await this.page.fill("#firstName", data.firstName);
    await this.page.fill("#lastName", data.lastName);
    await this.page.fill("#userEmail", data.email);

    await this.selectGender(data.gender);

    await this.page.fill("#userNumber", data.mobile);
    await this.page.fill("#dateOfBirthInput", data.dateOfBirth);
    for (const subject of data.subjects) {
      await this.page.fill("#subjectsInput", subject);
    }
    for (const hobby of data.hobbies) {
      await this.page.check(`label:has-text("${hobby}")`);
    }
    await this.page.setInputFiles("#uploadPicture", data.picture);
    await this.page.fill("#currentAddress", data.currentAddress);

    await this.page.fill("#react-select-3-input", data.state);
    await this.page.press("#react-select-3-input", "Enter");

    await this.page.fill("#react-select-4-input", data.city);
    await this.page.press("#react-select-4-input", "Enter");
  }

  
  private async selectGender(gender: string) {
    const genderRadioButton = this.page.locator(
      `input[name="gender"][value="${gender}"]`
    );
    await genderRadioButton.waitFor({ state: "visible", timeout: 10000 });
    const elementHandle = await genderRadioButton.elementHandle();
    if (!elementHandle) {
      throw new Error(`Gender radio button for value "${gender}" not found.`);
    }
    await this.page.evaluate((el) => {
      if (el) el.scrollIntoView();
    }, elementHandle);

    let isClicked = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await genderRadioButton.click({ force: true });
        isClicked = true;
        break;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        await this.page.waitForTimeout(500);
      }
    }

    if (!isClicked) {
      throw new Error(
        `Failed to click the gender radio button after multiple attempts`
      );
    }
  }

  async submitForm() {
    const submitButton = this.page.locator("#submit");

    await submitButton.waitFor({ state: "visible", timeout: 10000 });

    const elementHandle = await submitButton.elementHandle();
    if (!elementHandle) {
      throw new Error("Submit button not found.");
    }

    await this.page.evaluate((el) => {
      if (el) el.scrollIntoView();
    }, elementHandle);

    let isClicked = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await submitButton.click({ force: true });
        isClicked = true;
        break;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);

        await this.page.waitForTimeout(500);
      }
    }

    if (!isClicked) {
      throw new Error(
        "Failed to click the submit button after multiple attempts"
      );
    }
  }
}
