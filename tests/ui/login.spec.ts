import { test, expect } from '@playwright/test';

test.describe('@smoke Login', () => {

  test('valid user can login', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });

  test('invalid user cannot login', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

});
