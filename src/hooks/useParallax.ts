import { useRef } from 'react';
import { IParallax } from '@react-spring/parallax';

const useParallax = () => {
  const ref = useRef<IParallax>(null);

  const scrollTo = (page: number) => {
    ref.current?.scrollTo(page);
  };

  return {
    ref,
    scrollTo,
  };
};

export default useParallax;
