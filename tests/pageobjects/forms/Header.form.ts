import { Locator, Page } from '@playwright/test';
import { NavigationLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';
import Navigation from './Navigaton.form';

export default class Header implements IForm {
  readonly locator: Locator;

  private readonly navigation: Navigation;

  constructor(private readonly page: Page) {
    this.locator = page.locator('header');
    this.navigation = new Navigation(page);
  }

  get burger() {
    return this.locator.locator('role=button[name="Open navigation"]');
  }

  async goTo(linkType: NavigationLinkType) {
    await this.navigation.goTo(linkType);
  }
}
