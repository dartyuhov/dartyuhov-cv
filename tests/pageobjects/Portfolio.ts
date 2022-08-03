import { Page, BrowserContext } from '@playwright/test';
import Header from './Header.form';
import Summary from './Summary.form';
import SkillsCarousel from './SkillsCarousel.form';
import { IPage } from './types/types.d';
import ContactMe from './ContactMe.form';

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

  get contactMe() {
    return new ContactMe(this.page);
  }

  async open() {
    await this.page.goto('/');
  }

  getNotification() {
    return {
      title: this.page.locator('.mantine-Notification-title'),
      description: this.page.locator('.mantine-Notification-description'),
    };
  }
}
