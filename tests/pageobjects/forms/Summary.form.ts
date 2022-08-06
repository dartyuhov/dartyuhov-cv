import { Locator, BrowserContext, Page } from '@playwright/test';
import { SocialNetworkLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';

export default class Summary implements IForm {
  public readonly locator: Locator;

  private readonly context: BrowserContext;

  constructor(private readonly page: Page, context: BrowserContext) {
    this.locator = page.locator('#summary');
    this.context = context;
  }

  get helloText() {
    return this.locator.locator('span[class^=HelloText_hello]');
  }

  get gif() {
    return this.locator.locator('[class^="TerminalImage_gif"]');
  }

  get shortDescription() {
    return this.locator.locator('span[class^=HelloText_shortDescription]');
  }

  async goToSocial(socialNetwork: SocialNetworkLinkType) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.getSocialLinkLocator(socialNetwork).click(),
    ]);
    return newPage;
  }

  async getSocialHref(socialNetwork: SocialNetworkLinkType) {
    return this.getSocialLinkLocator(socialNetwork).getAttribute('href');
  }

  private getSocialLinkLocator(socialNetwork: SocialNetworkLinkType) {
    return this.locator.locator(`a:has(#${socialNetwork.toLowerCase()}-link)`);
  }
}
