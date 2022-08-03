import { expect } from '@playwright/test';
import { mockEmailSendReject, mockEmailSendSuccess } from '../mocks/send.email.mock';
import test from '../fixtures';

const userData = require('../../src/data/userData.json');

test.describe('Send email', () => {
  test('should send email', async ({ portfolio }) => {
    mockEmailSendSuccess(portfolio.page);

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
    await expect.poll(async () => (await notification.title.textContent()) === 'Sending...').toBeFalsy();
    await expect(notification.title).toHaveText('Success');
    await expect(notification.description).toHaveText('Your mail has been sent! I will reach you out you as soon as possible!');
  });

  test('should show error if emailJs reterns error', async ({ portfolio }) => {
    mockEmailSendReject(portfolio.page);

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
    await expect.poll(async () => (await notification.title.textContent()) === 'Sending...').toBeFalsy();
    await expect(notification.title).toHaveText('Error');
    await expect(notification.description).toHaveText(`Oops, something went wrong.You can contact me directly at ${userData.email}`);
  });
});
