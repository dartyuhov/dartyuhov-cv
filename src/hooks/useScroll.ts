import { useEffect, useState } from 'react';

type HookConfig = {
    factor: number;
}
const useScroll = (config: HookConfig = {
  factor: 1,
}) => {
  const [scrollState, setScrollState] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const scrollHeight = viewPortHeight * config.factor;
    const scrollPersent = (scrollState * 100) / scrollHeight;
    setScrollPercent(Math.round(scrollPersent > 100 ? 100 : scrollPersent));
  }, [scrollState]);

  useEffect(() => {
    function updateScroll(e: WheelEvent) {
      if (e.deltaY > 0 && scrollState >= 0) {
        setScrollState((prevState) => prevState + e.deltaY);
        setScrollDirection('down');
      } else if (e.deltaY < 0 && scrollState <= e.deltaY) {
        setScrollState(0);
        setScrollDirection('none');
      } else if (e.deltaY < 0) {
        setScrollDirection('up');
        setScrollState((prevState) => {
          if (prevState - -e.deltaY < 0) {
            return 0;
          }
          return prevState - -e.deltaY;
        });
      }
    }
    window.addEventListener('mousewheel', updateScroll as any);
    return () => {
      window.removeEventListener('mousewheel', updateScroll as any);
    };
  }, []);

  return {
    scrollState, scrollDirection, scrollPercent, setScrollPercent,
  };
};

export default useScroll;
