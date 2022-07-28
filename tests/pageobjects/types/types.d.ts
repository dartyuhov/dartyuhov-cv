import { Locator, Page, BrowserContext } from '@playwright/test';

export interface IForm {
    locator: Locator
}

export interface IPage {
    page: Page
    context?: BrowserContext
}
