import { Page, BrowserContext } from '@playwright/test';
import {
  ContactMe, Footer, Header, MyProjects, SkillsCarousel, Summary,
} from './forms';

export default class Portfolio {
  private readonly context: BrowserContext;

  private readonly page: Page;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  get header() {
    return new Header(this.page, this.context);
  }

  get summary() {
    return new Summary(this.page, this.context);
  }

  get skillsCarousel() {
    return new SkillsCarousel(this.page);
  }

  get myProjects() {
    return new MyProjects(this.page);
  }

  get contactMe() {
    return new ContactMe(this.page);
  }

  get footer() {
    return new Footer(this.page, this.context);
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
