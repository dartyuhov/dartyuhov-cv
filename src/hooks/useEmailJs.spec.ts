/* eslint-disable no-promise-executor-return */
import { waitFor } from '@testing-library/react/pure';
import { act, renderHook } from '@testing-library/react';
import { send, init } from '@emailjs/browser';
import useEmailJs from './useEmailJs';

jest.mock('@emailjs/browser');
const sendEmailJsMock = send as jest.MockedFunction<typeof send>;
const initEmailJsMock = init as jest.MockedFunction<typeof init>;

const resolveWith = (value: any) => () => new Promise(
  (res) => setTimeout(() => res(value), 100),
);
describe('useEmailJs', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useEmailJs());
    expect(result.current).toBeDefined();
  });
  it('should set isSending = true', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockImplementation(resolveWith({ text: 'success', status: 200 }) as typeof send);

    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isSending).toEqual(true));
  });

  it('send method should use SENDER_ID, TEMPLATE_ID', async () => {
    const { result } = renderHook(() => useEmailJs());
    const mock = jest.fn(() => Promise.resolve({ status: 200, text: 'success ' }));
    sendEmailJsMock.mockImplementation(mock);
    process.env.REACT_APP_EMAIL_JS_SENDER_ID = 'test-sender-id';
    process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID = 'test-template-id';
    await act(async () => {
      await result.current.sendEmail({
        subject: 'test', message: 'test', from: 'test', name: 'test',
      });
    });
    expect(mock).lastCalledWith(
      'test-sender-id',
      'test-template-id',
      {
        subject: 'test',
        name: 'test',
        reply_to: 'test',
        message: 'test',
      },
    );
  });

  it('should call init function imitidatly after send', () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockImplementation(resolveWith({ text: 'success', status: 200 }) as typeof send);
    process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY = 'publicKey';
    const mock = jest.fn((param: string) => param);
    initEmailJsMock.mockImplementationOnce(mock);
    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith('publicKey');
  });

  it('should set isSuccess = true', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockResolvedValue({ text: 'success', status: 200 });

    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toEqual(true));
  });

  it('should set isSending = false after timeout', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockResolvedValue({ text: 'success', status: 200 });

    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toEqual(true));
    jest.useFakeTimers();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    await waitFor(() => expect(result.current.isSending).toEqual(false));
  });

  it('should set isError = true if reject', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockRejectedValue({ status: 500 });

    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isError).toEqual(true));
  });

  it('should set isError = true if resolve with status !=200', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockResolvedValue({ text: 'error', status: 404 });

    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isError).toEqual(true));
  });

  it('should set isError = false after timeout', async () => {
    const { result } = renderHook(() => useEmailJs());
    sendEmailJsMock.mockRejectedValue({ status: 500 });
    jest.useFakeTimers();
    act(() => {
      result.current.sendEmail({
        subject: '', message: '', from: '', name: '',
      });
    });
    await waitFor(() => expect(result.current.isError).toEqual(true));
    act(() => { jest.runOnlyPendingTimers(); });
    await waitFor(() => expect(result.current.isSending).toEqual(false));
    await waitFor(() => expect(result.current.isError).toEqual(false));
  });
});
