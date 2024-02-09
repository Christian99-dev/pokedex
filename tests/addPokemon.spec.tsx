import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('+Add').click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').press('CapsLock');
  await page.getByPlaceholder('Name').fill('E');
  await page.getByPlaceholder('Name').press('CapsLock');
  await page.getByPlaceholder('Name').fill('Eren');
  await page.getByRole('slider').first().fill('85');
  await page.getByRole('slider').first().click();
  await page.getByRole('slider').nth(1).fill('4998');
  await page.getByRole('slider').nth(1).click();
  await page.getByRole('slider').nth(2).fill('350');
  await page.getByRole('slider').nth(2).click();
  await page.getByRole('slider').nth(3).fill('150');
  await page.getByRole('slider').nth(3).click();
  await page.getByRole('button', { name: 'Hinzufügen' }).click();

  // Nicht erfolgreich hinzugefügt
  await expect(page.locator('[id="\\31 "]')).toBeVisible();
  await page.getByRole('img', { name: 'add-circle.svg' }).click();
  await page.getByText('water').click();
  await page.getByRole('button', { name: 'Hinzufügen' }).click();

  // Erfolgreich hinzugefügt
  await expect(page.locator('[id="\\32 "]')).toContainText('Pokemon Hinzugefügt!');
});