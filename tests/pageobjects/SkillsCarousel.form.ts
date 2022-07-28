import { Locator, Page } from '@playwright/test';
import { IForm } from './types/types.d';

export default class SkillsCarousel implements IForm {
  public readonly locator: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('#skills');
  }

  getSlide(name: string) {
    return this.locator.locator(`[aria-label="skill ${name}"]`);
  }

  async openSlide(index: number) {
    await this.locator.locator('button.mantine-Carousel-indicator').nth(index).click();
  }
}
