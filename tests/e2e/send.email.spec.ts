import { expect } from '@playwright/test';
import { mockEmailSendReject, mockEmailSendSuccess } from '../mocks/send.email.mock';
import test from '../fixtures';

const userData = require('../../src/data/userData.json');

test.describe('Send email', () => {
  test('user should be able to send email', async ({ portfolio, page }) => {
    mockEmailSendSuccess(page);

    await portfolio.header.goTo('Contact me');
    await portfolio.contactMe.fill({
      name: 'test',
      email: 'test@test.com',
      message: 'Test message',
      subject: 'Test subject',
    });

    const notification = portfolio.getNotification();
    await expect(notification.title).toHaveText('Sending...');
    await expect(notification.description).toHaveText('Your email is on the way!');
    await expect(notification.title.first()).toHaveText('Success');
    await expect(notification.description.first()).toHaveText('Your mail has been sent! I will reach you out you as soon as possible!');
  });

  test('should see error if emailJs reterns error', async ({ portfolio, page }) => {
    mockEmailSendReject(page);

    await portfolio.header.goTo('Contact me');
    await portfolio.contactMe.fill({
      name: 'test',
      email: 'test@test.com',
      message: 'Test message',
      subject: 'Test subject',
    });

    const notification = portfolio.getNotification();
    await expect(notification.title).toHaveText('Sending...');
    await expect(notification.description).toHaveText('Your email is on the way!');

    await expect(notification.title.first()).toHaveText('Error');
    await expect(notification.description.first()).toHaveText(`Oops, something went wrong.You can contact me directly at ${userData.email}`);
  });
});
