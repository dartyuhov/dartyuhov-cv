import { expect } from '@playwright/test';
import foreach from 'async/each';
import test from '../fixtures';
import { SocialNetworkLinkType } from '../models/types.d';

const userData = require('../../src/data/userData.json');

test.describe('Social links', () => {
  test('user should be able to go to social links from summary', async ({ portfolio }) => {
    await foreach(Object.entries(userData.socialLinks), (async ([name, link]) => {
      const href = await portfolio.summary.getSocialHref(name as SocialNetworkLinkType);
      expect.soft(href).toEqual(link);
    }));
  });

  test('user should be able to go to social links from footer', async ({ portfolio }) => {
    await foreach(Object.entries(userData.socialLinks), (async ([name, link]) => {
      const href = await portfolio.footer.getSocialHref(name as SocialNetworkLinkType);
      expect.soft(href).toEqual(link);
    }));
  });
});

test.describe('Navigation', () => {
  test('user should be able to go to Skills', async ({ portfolio }) => {
    await portfolio.header.goTo('Skills');
    await expect(portfolio.skillsCarousel.locator).toBeVisible();
  });
  test('user should be able to go to My Projects', async ({ portfolio }) => {
    await portfolio.header.goTo('My Projects');
    await expect(portfolio.myProjects.locator).toBeVisible();
  });
  test('user should be able to go to Contact Me', async ({ portfolio }) => {
    await portfolio.header.goTo('Contact me');
    await expect(portfolio.contactMe.locator).toBeVisible();
  });
});
