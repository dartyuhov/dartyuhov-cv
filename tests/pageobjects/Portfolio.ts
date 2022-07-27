import { Page, BrowserContext } from '@playwright/test';
import Header from './Header.form';
import Summary from './Summary.form';
import Skills from './SkillsCarousel.form';

export default class Portfolio {
  private readonly context: BrowserContext;

  readonly page: Page;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  get header() {
    return new Header(this.page.locator('header'));
  }

  get summary() {
    return new Summary(this.page.locator('[class^="Summary_mainContainer"]'), this.context);
  }

  get skills() {
    return new Skills(this.page.locator('.title >> text=Skills'));
  }

  async open() {
    await this.page.goto('/');
  }
}
