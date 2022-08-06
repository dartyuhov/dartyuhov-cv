import { Page } from '@playwright/test';

const EMAIL_JS_SEND_EMAIL_URI = 'https://api.emailjs.com/api/v1.0/email/send';

export const mockEmailSendSuccess = (page: Page) => page.route(
  EMAIL_JS_SEND_EMAIL_URI,
  (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        message: 'Success!',
      }),
    });
  },
);

export const mockEmailSendReject = (page: Page) => page.route(
  EMAIL_JS_SEND_EMAIL_URI,
  (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({
        message: 'Something went wrong!',
      }),
    });
  },
);
