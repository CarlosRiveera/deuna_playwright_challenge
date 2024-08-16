# Magento Purchase Flow Automation

This repository contains a Playwright-based automation suite for testing the purchase flow on the Magento e-commerce platform.

## Getting Started

### Prerequisites

To run the tests, you'll need the following:

- [Node.js](https://nodejs.org/) installed on your machine.
- [Playwright](https://playwright.dev/) installed globally or locally in your project.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/CarlosRiveera/deuna_playwright_challenge.git
   cd deuna_playwright_challenge
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Tests

You can run all the tests using the Playwright test runner:

```bash
npx playwright test
```

### Project Structure

```
├── .gitignore
├── README.md
├── package.json
├── playwright.config.ts
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── ProductPage.ts
│   │   └── CheckoutPage.ts
│   ├── data/
│   │   ├── texts.ts
│   │   └── userData.ts
│   └── tests/
│       └── purchaseFlow.spec.ts
```

- **`pages/`**: Contains Page Object Models (POM) for the various pages of the purchase flow (e.g., `BasePage`, `ProductPage`, `CheckoutPage`).
- **`data/`**: Stores data such as test texts (`texts.ts`) and user billing information (`userData.ts`).
- **`tests/`**: Contains the test scenarios for validating the purchase flow on the Magento site.

### Notes

- The tests simulate a purchase of a product from the Magento e-commerce platform.
- Price validations are included, where the product price is compared against the expected total (including a shipping cost of $5).
- This repository is configured with GitHub Actions to automatically push Playwright files when a new pull request (PR) is submitted to the main database.
