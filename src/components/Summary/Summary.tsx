import { useState, useEffect, FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import { useMediaQuery } from '@mantine/hooks';
import TerminalImage from './TerminalImage';
import HelloText from './HelloText';
import SocialLinks from '../Common/SocialLinks';

import classes from './Summary.module.css';
import avatar from '../../images/avatar.jpeg';
import usePageConfig from '../../hooks/usePageConfig';

const Summary: FC<{ offset: number}> = ({ offset }) => {
  const [terminalActive, setTerminalActive] = useState(false);
  const { pagesConfig } = usePageConfig();
  const matchesSmallScreen = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
    setTimeout(() => {
      setTerminalActive(true);
    }, 8000);
  }, []);

  return (
    <div id="summary">
      {terminalActive && !matchesSmallScreen && (
        <ParallaxLayer
          factor={pagesConfig.factor}
          offset={offset}
          speed={pagesConfig.summary.speed - 0.1}
        >
          <TerminalImage />
        </ParallaxLayer>
      )}
      <ParallaxLayer offset={offset + 0.2} speed={pagesConfig.summary.speed}>
        <div className={classes.mainContainer}>
          <img src={avatar} alt="avatar" className={classes.photo} />
          <SocialLinks className={classes.social} />
          <HelloText />
        </div>
      </ParallaxLayer>
    </div>
  );
};

export default Summary;
