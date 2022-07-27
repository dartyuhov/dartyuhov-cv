import { expect } from '@playwright/test';
import test from '../fixtures';

test.describe('Sections visual tests', () => {
  test('should match skills section', async ({ portfolio }) => {
    await portfolio.header.goTo('Skills');
    await portfolio.page.mouse.move(0, 0);
    await expect(portfolio.page).toHaveScreenshot({ animations: 'disabled' });
  });

  test('should match about section', async ({ portfolio }) => {
    await expect(portfolio.summary.locator).toBeVisible();
    await expect(portfolio.summary.helloText).toHaveText('Hello, I\'m Dzmitry.');
    await expect(portfolio.summary.shortDescription).toHaveText('Software Developer In Test.');
    await expect(portfolio.page).toHaveScreenshot({ animations: 'disabled' });
  });
});
