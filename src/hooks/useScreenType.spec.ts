import { renderHook } from '@testing-library/react';
import useScreenType from './useScreenType';

describe('useScreenType hook', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useScreenType());

    expect(result.current).toBeDefined();
  });
  [1024, 1439].forEach((width) => {
    it(`should return 'desktop' type for screen width ${width}`, () => {
      window.innerWidth = width;
      const { result } = renderHook(() => useScreenType());
      expect(result.current).toBe('desktop');
    });
  });
  [1440, 2000].forEach((width) => {
    it(`should return 'widescreen' type for screen width ${width}`, () => {
      window.innerWidth = width;
      const { result } = renderHook(() => useScreenType());
      expect(result.current).toBe('widescreen');
    });
  });

  [768, 769, 1023].forEach((width) => {
    it(`should return 'tablet' type for screen width ${width}`, () => {
      window.innerWidth = width;
      const { result } = renderHook(() => useScreenType());
      expect(result.current).toBe('tablet');
    });
  });

  [767, 500].forEach((width) => {
    it(`should return 'mobile' type for screen width ${width}`, () => {
      window.innerWidth = width;
      const { result } = renderHook(() => useScreenType());
      expect(result.current).toBe('mobile');
    });
  });
});
