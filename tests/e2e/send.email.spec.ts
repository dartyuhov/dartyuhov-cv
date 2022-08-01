import { mockEmailSendReject, mockEmailSendSuccess } from '../mocks/send.email.mock';
import test from '../fixtures';

test.describe('Send email', () => {
  test.fixme('should send email', async ({ portfolio }) => {
    mockEmailSendSuccess(portfolio.page);

    await portfolio.header.goTo('Contact me');
    await portfolio.contactMe.fill({
      name: 'test',
      email: 'test@test.com',
      message: 'Test message',
      subject: 'Test subject',
    });
    await portfolio.page.waitForTimeout(10000);
  });

  test.fixme('should show error if emailJs reterns error', async ({ portfolio }) => {
    mockEmailSendReject(portfolio.page);

    await portfolio.header.goTo('Contact me');
    await portfolio.contactMe.fill({
      name: 'test',
      email: 'test@test.com',
      message: 'Test message',
      subject: 'Test subject',
    });
  });
});
