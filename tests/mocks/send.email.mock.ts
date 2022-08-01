import { Page } from '@playwright/test';

export const mockEmailSendSuccess = (page: Page) => page.route(
  'https://api.emailjs.com/api/v1.0/email/send',
  (route) => {
    route.fulfill({
      body: JSON.stringify({
        status: 200,
        message: 'Success!',
      }),
    });
  },
);

export const mockEmailSendReject = (page: Page) => page.route(
  'https://api.emailjs.com/api/v1.0/email/send',
  (route) => {
    route.fulfill({
      body: JSON.stringify({
        status: 500,
        message: 'Something went wrong!',
      }),
    });
  },
);
