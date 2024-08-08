# RiddhikaChatterjee-GM-Assignment

## Overview
This project uses Playwright for UI and API tests for [DemoQA.com](https://demoqa.com/) . The project follows a Page Object Model (POM) approach to maintain test readability and reusability.

## Folder Structure

````plaintext
RiddhikaChatterjee-GM-Assignment
  ├── base
  │   ├── pom-fixture.ts
  ├── config
  │   └── config.ts
  ├── e2e
  │   ├── api
  │   │   ├── api-utils.ts
  │   │   └── api.spec.ts
  │   └── ui
  │       ├── pages
  │       │   ├── broken-image-page.ts
  │       │   ├── drag-and-drop-page.ts
  │       │   ├── form-page.ts
  │       │   ├── progress-bar-page.ts
  │       │   ├── table-page.ts
  │       │   └── tooltip-page.ts
  │       └── tests
  │           ├── broken-image.spec.ts
  │           ├── drag-and-drop-page.spec.ts
  │           ├── form.spec.ts
  │           ├── progress-bar.spec.ts
  │           ├── table.spec.ts
  │           └── tooltip.spec.ts
  ├── utils
  │   └── data-utils.ts
  ├── playwright-report
  ├── test-results
  ├── node_modules
  ├── .env
  ├── .gitignore
  ├── data.json
  ├── package.json
  ├── package-lock.json
  ├── playwright.config.ts
  ├── tsconfig.json
  └── README.md

````

## Setup
### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation and steps to run tests
1. Clone the repository:

```bash
git clone https://github.com/ridchatt/RiddhikaChatterjee-GM-Assignment.git
cd RiddhikaChatterjee-GM-Assignment
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright:

```bash
npx playwright install
```

## Run tests
Please note that the UI tests are present under e2e/ui. All the API tests for Book store application are present under e2e/api.

### How to run all tests (both UI and API tests)

#### headless
```bash
npx playwright test
```

#### headed
```bash
npx playwright test --headed
```

### How to run a specific test
For example if you'd like to run broken-image.spec.ts, for any other test please use name of the specific test file accordingly.
#### headless
```bash
npx playwright test broken-image.spec.ts 
```

#### headed
```bash
npx playwright test broken-image.spec.ts --headed
```

## How to generate test report
```bash
npx playwright show-report
```

## Test report generated after running all tests
![Screenshot of the application](images/playwright-test-report.png)

## Points to note
1) Page Object Model: I have used Page Object classes in the pages directory to encapsulate interactions with UI components.
2) Test Cases: I have organized test cases into appropriate files within the tests directory.
3) Data Management: I have stored test data and endpoints in data.json and in .env file respectively for easy management and reuse.
