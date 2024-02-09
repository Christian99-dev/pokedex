import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Pokedex' }).click();
  await expect(page.locator('[id="__next"]')).toContainText('BULBASAUR');
  await expect(page.getByText('BULBASAUR1')).toBeVisible();
  await page.getByRole('img', { name: 'add-circle.svg' }).click();
  await page.getByText('ground').click();
  await expect(page.locator('[id="__next"]')).toContainText('SANDSHREW');
  await expect(page.locator('[id="__next"]')).toContainText('ground');
  await page.getByRole('slider').first().fill('85');
  await page.getByRole('slider').first().click();
  await expect(page.locator('[id="__next"]')).toContainText('ONIX');
});