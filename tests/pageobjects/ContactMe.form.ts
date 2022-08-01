import { Locator, Page } from '@playwright/test';
import { IForm } from './types/types.d';

export default class ContactMe implements IForm {
  readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.locator('#contact-me');
  }

  async fill(data: {
      name: string;
      email: string;
      message: string;
      subject: string;
  }) {
    await this.locator.locator('input[name="name"]').type(data.name);
    await this.locator.locator('input[name="email"]').type(data.email);
    await this.locator.locator('input[name="subject"]').type(data.subject);
    await this.locator.locator('textarea[name="Message"]').type(data.message);
    await this.locator.locator('button[type="submit"]').click();
  }
}
