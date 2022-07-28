import { Page, BrowserContext } from '@playwright/test';
import Header from './Header.form';
import Summary from './Summary.form';
import SkillsCarousel from './SkillsCarousel.form';
import { IPage } from './types/types.d';

export default class Portfolio implements IPage {
  readonly context: BrowserContext;

  readonly page: Page;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  get header() {
    return new Header(this.page);
  }

  get summary() {
    return new Summary(this.page, this.context);
  }

  get skillsCarousel() {
    return new SkillsCarousel(this.page);
  }

  async open() {
    await this.page.goto('/');
  }
}
