import { useState, useRef } from 'react';
import { IParallax } from '@react-spring/parallax';
import { useWindowEvent } from '@mantine/hooks';

const useParallax = () => {
  const ref = useRef<IParallax>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  function updateScrollPercent() {
    if (ref.current) {
      const pageHeight = ref.current.space;
      const currentPosition = ref.current.current;
      setScrollPercent(Math.round((currentPosition * 100) / pageHeight));
    }
  }

  const trackScroll = (timeout?: number) => () => {
    if (timeout) {
      for (let i = 0; i < timeout; i += 1) {
        setTimeout(() => updateScrollPercent(), i);
      }
    } else {
      updateScrollPercent();
    }
  };

  useWindowEvent('mousewheel', trackScroll(10));
  useWindowEvent('touchmove', trackScroll(10));

  return {
    ref,
    scrollPercent,
    trackScroll,
  };
};

export default useParallax;
