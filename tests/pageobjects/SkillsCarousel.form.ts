import { Locator, Page } from '@playwright/test';
import { IForm } from './types/types.d';

export default class SkillsCarousel implements IForm {
  public readonly locator: Locator;

  private page;

  constructor(page: Page) {
    this.page = page;
    this.locator = page.locator('#skills');
  }

  getSlide(name: string) {
    return this.locator.locator(`[aria-label="skill ${name}"]`);
  }

  async openSlide(index: number) {
    await this.locator.locator('button.mantine-Carousel-indicator').nth(index).click();
  }

  getSlideByName(name: string) {
    return this.locator.locator(`[class^="mantine-Carousel-slide"]:has([aria-label="skill ${name}"])`);
  }
}
