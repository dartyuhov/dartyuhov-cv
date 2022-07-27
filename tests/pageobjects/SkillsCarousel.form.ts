import { Locator } from '@playwright/test';

class SkillsCarousel {
  public readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async isDisplayed() {
    return this.locator.isVisible();
  }
}

export default SkillsCarousel;
