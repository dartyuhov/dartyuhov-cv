import { Locator, Page } from '@playwright/test';
import { IForm } from '../types/types.d';

export default class MyProjects implements IForm {
  readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.locator('#projects');
  }

  async getAllProjectNames() {
    return this.locator.locator('role=heading[name="Project name"]').allInnerTexts();
  }
}
