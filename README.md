# RIDDHIKACHATTERJEE-GM-ASSIGNMENT

## Overview
This project uses Playwright for UI and API tests for [DemoQA.com](https://demoqa.com/) . The project follows a Page Object Model (POM) approach to maintain test readability and reusability.

## Folder Structure

````plaintext
RIDDHIKACHATTERJEE-GM-ASSIGNMENT
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
  ├── testPath.js
  ├── tsconfig.json
  └── README.md

````

## Setup
### Prerequisites
Node.js (v16 or higher)
npm (v7 or higher)

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

## How to run tests

### How to run all tests

#### headless
```bash
npx playwright test
```

#### headed
```bash
npx playwright test --headed
```

### How to run all tests (both UI and API tests)
For example test broken-image.spec.ts, please use name of the specific test file accordingly
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

## Points to note
1) Page Object Model: I have used Page Object classes in the pages directory to encapsulate interactions with UI components.
2) Test Cases: I have organized test cases into appropriate files within the tests directory.
3) Data Management: I have stored test data and endpoints in data.json and in .env file respectively for easy management and reuse.
