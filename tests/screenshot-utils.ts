import { expect, Locator, Page } from '@playwright/test';

type Config = {
    mask: Locator[]
    debug: boolean
}

export default async (page: Page, config?: Partial<Config>) => {
  if (config?.debug) {
    await page.waitForTimeout(2000);
  }
  await expect(page).toHaveScreenshot({
    ...config,
    maxDiffPixelRatio: 0.02,
    scale: 'css',
    animations: 'disabled',
  });
};
