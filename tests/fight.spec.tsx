import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Fight' }).click();
  await expect(page.locator('[id="__next"]')).toContainText('BULBASAUR');
  await expect(page.locator('[id="__next"]')).toContainText('CHARMANDER');
  await expect(page.locator('[id="__next"]')).toContainText('grasspoison');
  await expect(page.locator('[id="__next"]')).toContainText('fire');
  await page.getByRole('img', { name: 'vs_icon.png' }).click();
  await expect(page.getByText('THE WINNER CHARMANDER')).toBeVisible();
  await expect(page.getByLabel('Battle Result Modal').locator('div')).toContainText('THE WINNER');
  await expect(page.getByLabel('Battle Result Modal').locator('div')).toContainText('CHARMANDER');
  await page.getByRole('img', { name: 'close.svg' }).click();
  await page.getByText('BLASTOISE9').first().click();
  await page.getByRole('img', { name: 'vs_icon.png' }).click();
  await expect(page.getByLabel('Battle Result Modal').locator('div')).toContainText('BLASTOISE');
  await expect(page.getByLabel('Battle Result Modal').locator('div')).toContainText('THE WINNER');
});