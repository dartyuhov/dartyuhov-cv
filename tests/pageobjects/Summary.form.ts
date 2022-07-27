import { Locator, BrowserContext } from '@playwright/test';

export type SocialNetworkLinkType = 'GitHub' | 'Instagram' | 'LinkedIn';

export default class Summary {
  public readonly locator: Locator;

  private readonly context: BrowserContext;

  constructor(locator: Locator, context: BrowserContext) {
    this.locator = locator;
    this.context = context;
  }

  get helloText() {
    return this.locator.locator('span[class^=HelloText_hello]');
  }

  get shortDescription() {
    return this.locator.locator('span[class^=HelloText_shortDescription]');
  }

  async goToSocial(socialNetwork: SocialNetworkLinkType) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.locator.locator(`#${socialNetwork.toLowerCase()}-link`).click(),
    ]);
    return newPage;
  }

  async getSocialHref(socialNetwork: SocialNetworkLinkType) {
    return this.locator.locator('a', {
      has: this.locator.locator(`#${socialNetwork.toLowerCase()}-link`),
    }).getAttribute('href');
  }

  async isDisplayed() {
    return this.locator.isVisible();
  }
}
