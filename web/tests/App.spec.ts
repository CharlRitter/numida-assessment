import { test, expect } from '@playwright/test';

const devSite = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  // Navigate to your development site before each test
  await page.goto(devSite);
});

test.describe('End-to-End Payment Flow', () => {
  test('should add a new payment and refresh the loans table with updated payment date', async ({ page }) => {
    // Fill in the Add Payment form
    await page.fill('input[name="loan-id"]', '4');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the "Add Payment" button
    const addButton = page.getByRole('button', { name: 'Add Payment' });
    await addButton.click();

    // Wait for spinner to appear and then disappear
    await page.waitForSelector('.spinner', { state: 'visible', timeout: 5000 });
    await page.waitForSelector('.spinner', { state: 'detached', timeout: 10000 });

    // Verify that the loans table now includes a row with the updated payment date
    const paymentDateCell = page.locator('table tr', { hasText: '2025-04-30' });
    await expect(paymentDateCell).toBeVisible();
  });

  test('should display a spinner while submitting', async ({ page }) => {
    // Fill in the form
    await page.fill('input[name="loan-id"]', '12345');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the button and simultaneously wait for the spinner
    await Promise.all([
      page.waitForSelector('.spinner', { state: 'visible', timeout: 5000 }),
      page.getByRole('button', { name: 'Add Payment' }).click()
    ]);

    // Confirm the spinner is visible
    await expect(page.locator('.spinner')).toBeVisible();
  });

  test('should show an error message when submission fails', async ({ page }) => {
    // Force an error scenario. For example, leave the required fields empty.
    await page.fill('input[name="loan-id"]', 'HI');
    await page.fill('input[name="payment-date"]', '2025-04-30');

    // Click the button. (Client side required validation may prevent submission,
    // so you might need to simulate an API error if your form allows submission in test mode.)
    await page.getByRole('button', { name: 'Add Payment' }).click();

    // Check for the error message with our styled error container. Adjust the locator if needed.
    const errorBox = page.locator('div', { hasText: 'Loan Id must be a valid Id number.' });
    await expect(errorBox).toBeVisible();
  });
});
