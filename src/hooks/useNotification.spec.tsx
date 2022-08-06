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
      icon: (<IconCheck fillOpacity={0} />),
      disallowClose: false,
    }));
    // check notification icon's background color
    expect((showNotificationMock.mock.calls[0][0] as any).styles()).toEqual(
      { icon: { backgroundColor: '#12b886 !important' } },
    );
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
    // check notification icon's background color
    expect((showNotificationMock.mock.calls[0][0] as any).styles()).toEqual(
      { icon: { backgroundColor: 'white !important' } },
    );
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
      icon: <IconX />,
      disallowClose: false,
    }));

    // check notification icon's background color
    expect((showNotificationMock.mock.calls[0][0] as any).styles()).toEqual(
      { icon: { backgroundColor: 'red !important' } },
    );
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
