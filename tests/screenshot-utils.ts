import { expect, Locator, Page } from '@playwright/test';

type Config = {
    mask: Locator[]
}

export const shouldMatchPageSnapshot = async (page: Page, config?: Partial<Config>) => {
  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.02,
    scale: 'css',
    animations: 'disabled',
    ...config,
  });
};

export const shouldMatchElementSnapshot = async (locator: Locator, config?: Partial<Config>) => {
  expect(await locator.screenshot({
    scale: 'css',
    animations: 'disabled',
    ...config,
  })).toMatchSnapshot({
    maxDiffPixelRatio: 0.02,
  });
};
