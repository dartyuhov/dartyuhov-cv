import { Locator, Page } from '@playwright/test';
import { IForm } from './types/types.d';

export default class Header implements IForm {
  readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.locator('header');
  }

  async goTo(link: 'About' | 'Skills') {
    await this.locator.locator(`text=${link}`).click();
  }
}
