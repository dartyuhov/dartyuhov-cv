import { expect } from '@playwright/test';
import test from '../fixtures';
import { SocialNetworkLinkType } from '../pageobjects/Summary.form';

test.describe('Social links', () => {
  const testData: { linkName: SocialNetworkLinkType, url: string | RegExp }[] = [
    {
      linkName: 'Instagram',
      url: 'https://www.instagram.com/dima_artyukhov/',
    },
    {
      linkName: 'LinkedIn',
      url: /https:\/\/www\.linkedin\.com\//,
    },
    {
      linkName: 'GitHub',
      url: 'https://github.com/dartyuhov',
    },
  ];

  testData.forEach((data) => {
    test(`user should be able to go to ${data.linkName}`, async ({ portfolio }) => {
      const socialNetworkPage = await portfolio.summary.goToSocial(data.linkName);
      await expect(socialNetworkPage).toHaveURL(data.url);
    });
  });
  // TODO fix test
  test('Instagram link is correct', async ({ portfolio }) => {
    const linkedinHref = await portfolio.summary.getSocialHref('LinkedIn');
    expect(linkedinHref).toBe('https://www.linkedin.com/in/dmitry-artyuhov-75873913b');
  });
});
