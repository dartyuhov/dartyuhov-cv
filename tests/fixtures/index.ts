import { test as base } from '@playwright/test';

import Portfolio from '../pageobjects';

export default base.extend<{ portfolio: Portfolio }>({
  portfolio: async ({ page, context }, use) => {
    const portfolio = new Portfolio(page, context);
    await portfolio.open();
    await use(portfolio);
  },
});
