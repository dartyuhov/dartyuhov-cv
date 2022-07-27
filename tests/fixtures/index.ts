import { test as base } from '@playwright/test';

import Portfolio from '../pageobjects';

export default base.extend<{ portfolio: Portfolio }>({
  portfolio: async ({ page, context }, use) => {
    const todoPage = new Portfolio(page, context);
    await todoPage.open();
    await use(todoPage);
  },
});
