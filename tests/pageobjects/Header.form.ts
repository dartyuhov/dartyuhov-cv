import { Locator } from '@playwright/test';

class Header {
  private readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async goTo(link: 'About' | 'Skills') {
    await this.locator.locator(`text=${link}`).click();
  }
}

export default Header;
