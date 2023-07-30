/* eslint-disable import/no-extraneous-dependencies */
import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import { Parallax } from '@react-spring/parallax';
import { send } from '@emailjs/browser';
import userEvent from '@testing-library/user-event';
import ContactMe from './ContactMe';
import useNotification from '../../hooks/useNotification';
import userData from '../../data/userData.json';
import classes from './ContactMe.module.css';

jest.mock('../../hooks/useNotification');
jest.mock('@emailjs/browser');

const sendNotificationMock = useNotification as jest.MockedFunction<typeof useNotification>;
const sendEmailJsMock = send as jest.MockedFunction<typeof send>;

describe('ContactMe', () => {
  beforeEach(() => render(
    <Parallax pages={1}>
      <ContactMe offset={0} />
    </Parallax>,
  ));

  it('should render contact me', () => {
    expect(screen.getByText('Contact me')).toBeInTheDocument();
  });

  it('should render required name field', () => {
    const nameInput = screen.getByRole('textbox', { name: 'Your Name:' });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeRequired();
  });

  it('should render required email field', () => {
    const emailInput = screen.getByRole('textbox', { name: 'Your Email:' });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeRequired();
  });

  it('should render required subject field', () => {
    const subjectInput = screen.getByRole('textbox', { name: 'Subject:' });
    expect(subjectInput).toBeInTheDocument();
    expect(subjectInput).toBeRequired();
  });

  it('should render required message field', () => {
    const messageInput = screen.getByRole('textbox', { name: 'Message:' });
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toBeRequired();
  });

  ['test@test', 'test', '@test', 'test@', ''].forEach((email) => {
    it(`should render error if email is invalid ${email}`, () => {
      userEvent.type(screen.getByRole('textbox', { name: 'Your Email:' }), email);
      userEvent.type(screen.getByRole('textbox', { name: 'Your Name:' }), 'test');
      userEvent.type(screen.getByRole('textbox', { name: 'Subject:' }), 'test');
      userEvent.type(screen.getByRole('textbox', { name: 'Message:' }), 'test');

      act(() => userEvent.click(screen.getByText('Submit')));

      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('should render error message if there is error with EmailJS', async () => {
    sendEmailJsMock.mockRejectedValue({ message: 'error', status: 500 });
    const mockNotification = jest.fn((props: any) => props);
    sendNotificationMock.mockImplementation(jest.fn().mockImplementation(() => (props: any) => {
      mockNotification(props);
    }));

    userEvent.type(screen.getByRole('textbox', { name: 'Your Email:' }), 'test@test.com');
    userEvent.type(screen.getByRole('textbox', { name: 'Your Name:' }), 'test');
    userEvent.type(screen.getByRole('textbox', { name: 'Subject:' }), 'test');
    userEvent.type(screen.getByRole('textbox', { name: 'Message:' }), 'test');

    act(() => {
      userEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(mockNotification).toBeCalledWith(
        {
          message: 'Your email is on the way!',
          title: 'Sending...',
          type: 'loading',
        },
      );
      const subject = 'Message from dartyuhov-cv!';
      const body = 'Hi, I wanted to get in touch with you!';

      // Encode the subject and body to be properly formatted in the email link
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailToLink = `mailto:${userData.email}?subject=${encodedSubject}&body=${encodedBody}`;
      expect(mockNotification).toBeCalledWith(expect.objectContaining({
        message: (
          <>
            Oops, something went wrong.
            <br />
            You can contact me directly at
            {' '}
            <a className={classes.emailLink} href={mailToLink}>{userData.email}</a>
          </>
        ),
        title: 'Error',
        type: 'error',
        timeout: 15000,
      }));
    });
  });

  it('should render success message if there is no error with EmailJS', async () => {
    sendEmailJsMock.mockResolvedValue({ text: 'success', status: 200 });
    const mockNotification = jest.fn((props: any) => props);
    sendNotificationMock.mockImplementation(jest.fn()
      .mockImplementation(() => (props: any) => mockNotification(props)));

    userEvent.type(screen.getByRole('textbox', { name: 'Your Email:' }), 'test@test.com');
    userEvent.type(screen.getByRole('textbox', { name: 'Your Name:' }), 'test');
    userEvent.type(screen.getByRole('textbox', { name: 'Subject:' }), 'test');
    userEvent.type(screen.getByRole('textbox', { name: 'Message:' }), 'test');

    act(() => userEvent.click(screen.getByText('Submit')));

    await waitFor(() => {
      expect(mockNotification).toBeCalledWith(expect.objectContaining({
        title: 'Sending...',
      }));
      expect(mockNotification).toBeCalledWith({
        message: 'Your mail has been sent! I will reach you out you as soon as possible!',
        title: 'Success',
        type: 'success',
        timeout: 5000,
      });
    });
  });

  it('should reset from after success', async () => {
    sendEmailJsMock.mockResolvedValue({ text: 'success', status: 200 });
    const mockNotification = jest.fn();
    sendNotificationMock.mockImplementation(jest.fn()
      .mockImplementation(() => (props: any) => mockNotification(props)));

    const emailInput = screen.getByRole('textbox', { name: 'Your Email:' });
    userEvent.type(emailInput, 'test@test.com');
    const nameInput = screen.getByRole('textbox', { name: 'Your Name:' });
    userEvent.type(nameInput, 'test');
    const subjectInput = screen.getByRole('textbox', { name: 'Subject:' });
    userEvent.type(subjectInput, 'test');
    const messageInput = screen.getByRole('textbox', { name: 'Message:' });
    userEvent.type(messageInput, 'test');

    jest.useFakeTimers();
    await act(async () => userEvent.click(screen.getByText('Submit')));

    expect(mockNotification).toBeCalledWith(expect.objectContaining({ title: 'Success' }));
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(nameInput).toHaveValue('');
      expect(subjectInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });
});
