import { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

export type ScreenType = 'widescreen' | 'desktop'| 'tablet' | 'mobile';

const calcScreenType = (width: number): ScreenType => {
  if (width >= 1440) {
    return 'widescreen';
  }
  if (width >= 1024 && width < 1440) {
    return 'desktop';
  }
  if (width >= 768 && width < 1024) {
    return 'tablet';
  }
  return 'mobile';
};

const useScreenType = (): ScreenType => {
  const { width } = useViewportSize();
  const [screenType, setScreenType] = useState<ScreenType>(calcScreenType(width));

  useEffect(() => {
    setScreenType(calcScreenType(width));
  }, [width]);

  return screenType;
};

export default useScreenType;
