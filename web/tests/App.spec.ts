import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotDir = path.join(__dirname, '../test-results');
const devSite = 'http://localhost:5173/';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

test.beforeEach(async ({ page }) => {
  // Navigate to your development site before each test
  await page.goto(devSite);
});

test.describe('End-to-End Payment Flow', () => {
  test('should add a new payment and refresh the loans table with updated payment date', async ({ page }) => {
    // Intercept the API request and add a delay of 1 second.
    await page.route('**/payments', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Fill in the Add Payment form
    await page.fill('input[name="loan-id"]', '4');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the button and simultaneously wait for the spinner.
    await Promise.all([
      page.waitForSelector('#spinner', { state: 'visible', timeout: 5000 }),
      page.waitForSelector('#spinner', { state: 'detached', timeout: 10000 }),
      page.getByRole('button', { name: 'Add Payment' }).click()
    ]);

    // Capture a screenshot of the final state.
    await page.screenshot({ path: `${screenshotDir}/payment-added-screenshot.png` });

    // Verify that the loans table now includes a row with the updated payment date
    const paymentDateCell = page.locator('table tr', { hasText: '2025-04-30' });
    await expect(paymentDateCell).toBeVisible();
  });

  test('should display a spinner while submitting', async ({ page }) => {
    // Intercept the API request and add a delay of 1 second.
    await page.route('**/payments', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Fill in the form.
    await page.fill('input[name="loan-id"]', '12345');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the button and simultaneously wait for the spinner.
    await Promise.all([
      page.waitForSelector('#spinner', { state: 'visible', timeout: 5000 }),
      page.getByRole('button', { name: 'Add Payment' }).click()
    ]);

    // Capture the screenshot once the spinner is visible.
    await page.screenshot({ path: `${screenshotDir}/spinner-visible-screenshot.png` });

    await expect(page.locator('#spinner')).toBeVisible();
  });

  test('should show an error message when submission fails', async ({ page }) => {
    // Force an error scenario.
    await page.fill('input[name="loan-id"]', 'HI');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the button.
    await page.getByRole('button', { name: 'Add Payment' }).click();

    // Capture a screenshot for the error state.
    await page.screenshot({ path: `${screenshotDir}/error-message-screenshot.png` });

    // Check for the error message with our styled error container.
    const errorBox = page.locator('#error-message');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText('Loan Id must be a valid Id number.');
  });
});
