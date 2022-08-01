import { renderHook } from '@testing-library/react';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import useNotification from './useNotification';

jest.mock('@mantine/notifications');
const showNotificationMock = showNotification as jest.MockedFunction<typeof showNotification>;

describe('useNotification', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useNotification());
    expect(result.current).toBeDefined();
  });

  it('should call success noticiation', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: 'test',
      type: 'success',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'test',
      title: 'test',
      loading: false,
      radius: 'md',
      closeButtonProps: {
        'aria-label': 'Hide notification',
      },
      icon: (<IconCheck color="teal" />),
      disallowClose: false,
    }));
  });

  it('should call loading noticiation', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: 'test',
      type: 'loading',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'test',
      title: 'test',
      radius: 'md',
      closeButtonProps: {
        'aria-label': 'Hide notification',
      },
      loading: true,
      icon: undefined,
      disallowClose: true,
    }));
  });

  it('should call error noticiation', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: 'test',
      type: 'error',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'test',
      title: 'test',
      loading: false,
      radius: 'md',
      closeButtonProps: {
        'aria-label': 'Hide notification',
      },
      icon: <IconX color="red" />,
      disallowClose: false,
    }));
  });

  it('should accept tsx as message', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: <div> dummy </div>,
      type: 'success',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      message: <div> dummy </div>,
    }));
  });

  it('should render with timeout', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: <div> dummy </div>,
      type: 'success',
      title: 'test',
      timeout: 1000,
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      autoClose: 1000,
    }));
  });

  it('should render only loading type with spinner', () => {
    const { result } = renderHook(() => useNotification());
    result.current({
      message: 'test',
      type: 'success',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      loading: false,
    }));
    result.current({
      message: 'test',
      type: 'error',
      title: 'test',
    });
    expect(showNotificationMock).toHaveBeenCalledWith(expect.objectContaining({
      loading: false,
    }));
  });
});
