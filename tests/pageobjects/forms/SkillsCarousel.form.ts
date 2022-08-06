import { Locator, Page } from '@playwright/test';
import { IForm } from '../types/types.d';

export default class SkillsCarousel implements IForm {
  public readonly locator: Locator;

  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.locator = page.locator('#skills');
  }

  async getAllSkillSlideNames() {
    return this.locator.locator('[class^="SkillBox_name"]').allTextContents();
  }

  getSkillSlide(name: string) {
    return this.locator.locator(`[aria-label="skill ${name}"]`);
  }
}
