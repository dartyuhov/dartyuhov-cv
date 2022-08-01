import { waitFor } from '@testing-library/react/pure';
/* eslint-disable max-len */
import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  useViewportSize, useElementSize, useDebouncedValue,
} from '@mantine/hooks';

const defaultPageConfig = {
  pageCount: 4,
  summary: {
    start: 0,
    end: 1,
  },
  skills: {
    start: 1,
    end: 2,
  },
  projects: {
    start: 2,
    end: 3,
  },
  contactMe: {
    start: 4,
    end: 5,
  },
};

const usePageConfig: () => {
  ref: React.MutableRefObject<any>,
  pagesConfig: typeof defaultPageConfig,
  isLoading: boolean,
} = jest.requireActual('./usePageConfig').default;

jest.mock('@mantine/hooks');
const useViewportSizeMock = useViewportSize as jest.MockedFunction<typeof useViewportSize>;
const useElementSizeMock = useElementSize as jest.MockedFunction<typeof useElementSize>;
const useDebouncedValueMock = useDebouncedValue as jest.MockedFunction<typeof useDebouncedValue>;

describe('usePageConfig', () => {
  it('should be defined', () => {
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 0, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    const { result } = renderHook(() => usePageConfig());
    expect(result.current).toBeDefined();
  });

  it('should return dispatch widnow resize on mount', async () => {
    const mock = jest.fn();
    jest.spyOn(window, 'dispatchEvent').mockImplementation(mock);
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 0, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    const { result } = renderHook(() => usePageConfig());
    expect(result.current).toBeDefined();
    expect(mock).toHaveBeenCalledWith(new Event('resize'));
  });

  it('should compute new pageConfig only after projects size changes', async () => {
    const mock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [defaultPageConfig, mock])
      .mockImplementationOnce(() => [true, jest.fn()]);
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 1, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    renderHook(() => usePageConfig());
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should return deafault config', async () => {
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    const mock = jest.fn((props: any) => props);
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [defaultPageConfig, mock])
      .mockImplementationOnce(() => [true, jest.fn()]);
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 0, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    const { result } = renderHook(() => usePageConfig());
    expect(result.current.pagesConfig).toEqual(defaultPageConfig);
  });

  it('should isLoading onInit', async () => {
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    const mock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [defaultPageConfig, jest.fn()])
      .mockImplementationOnce(((value: boolean) => [value, mock]) as any);
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 0, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    const { result } = renderHook(() => usePageConfig());
    expect(result.current.isLoading).toBe(true);
  });

  it('should set isLoading = false after timeout if projects height > 0', async () => {
    useViewportSizeMock.mockImplementation(() => ({ height: 0, width: 0 }));
    const mock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [defaultPageConfig, jest.fn()])
      .mockImplementationOnce(((value: boolean) => [value, mock]) as any);
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 2, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    const { result } = renderHook(() => usePageConfig());
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(2);
    });
    jest.useFakeTimers();
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledWith(false);
  });

  it('should calculate pages offsets correctly', async () => {
    const mock = jest.fn((props: any) => props);
    jest.spyOn(React, 'useState').mockImplementation(() => [defaultPageConfig, mock]);
    useViewportSizeMock.mockImplementation(() => ({ height: 1, width: 0 }));
    useElementSizeMock.mockImplementationOnce(() => ({ ref: {} as any, height: 2, width: 100 }));
    useDebouncedValueMock.mockImplementation((value: any) => [value] as any);

    renderHook(() => usePageConfig());
    expect(mock).toBeCalledWith(expect.objectContaining({
      pageCount: 5.5,
      projects: {
        start: 2,
        end: 4,
      },
      contactMe: {
        start: 4,
        end: 5,
      },
    }));
  });
});
