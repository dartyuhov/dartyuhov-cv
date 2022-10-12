import { Locator, Page, BrowserContext } from '@playwright/test';
import { NavigationLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';
import Navigation from './Navigaton.form';

export default class Header implements IForm {
  readonly locator: Locator;

  readonly context: BrowserContext;

  private readonly navigation: Navigation;

  constructor(private readonly page: Page, private readonly browserContext: BrowserContext) {
    this.locator = page.locator('header');
    this.context = browserContext;
    this.navigation = new Navigation(page);
  }

  get burger() {
    return this.locator.locator('role=button[name="Open navigation"]');
  }

  async downloadCv() {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.locator.locator('role=link[name=\'Download CV\']').click(),
    ]);
    return newPage;
  }

  async goTo(linkType: NavigationLinkType) {
    await this.navigation.goTo(linkType);
  }
}
