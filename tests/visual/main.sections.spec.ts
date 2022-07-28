import { expect } from '@playwright/test';
import test from '../fixtures';
import shouldMatchSnapshot from '../screenshot-utils';

test.describe('Sections visual tests', () => {
  test('should match skills section', async ({ portfolio }) => {
    await portfolio.header.goTo('Skills');
    await portfolio.page.mouse.move(0, 0);
    await shouldMatchSnapshot(portfolio.page);
  });

  test('should match about section', async ({ portfolio }) => {
    await expect(portfolio.summary.helloText).toHaveText('Hello, I\'m Dzmitry.');
    await shouldMatchSnapshot(portfolio.page, {
      mask: [
        portfolio.summary.gif,
        portfolio.summary.shortDescription,
      ],
    });
  });
});
