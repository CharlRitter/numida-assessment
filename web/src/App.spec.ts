import { expect, test } from '@playwright/test';

const devSite = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  // Launch the browser and navigate to the dev site
  await page.goto(devSite);
});

test.describe('Initial Truthy Test', () => {
  test('Add values & click', async ({ page }) => {
    await page.fill('input[name="loan-id"]', '5');
    await page.fill('input[name="payment-amount"]', '5');
    await page.getByRole('button', { name: 'Add Payment' }).click();

    // Take a screenshot for visual verification
    await page.screenshot({
      path: `test-results/screenshot.png`
    });

    // Verify that the URL has changed to the expected value
    await expect(page).toHaveURL(`${devSite}`);
  });
});
