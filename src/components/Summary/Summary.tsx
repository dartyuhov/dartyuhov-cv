import { useState, useEffect } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import TerminalImage from './TerminalImage';
import HelloText from './HelloText';
import SocialLinks from './SocialLinks';

import classes from './Summary.module.css';
import avatar from '../../images/avatar.jpeg';
import pagesConfig from '../../pages.config';

const { summary } = pagesConfig;

const Summary = () => {
  const [terminalActive, setTerminalActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTerminalActive(true);
    }, 8000);
  }, []);

  return (
    <>
      <ParallaxLayer
        factor={summary.factor}
        offset={summary.start}
        speed={0.2}
      >
        <TerminalImage active={terminalActive} />
      </ParallaxLayer>
      <ParallaxLayer offset={summary.start + 0.2} speed={0.5}>
        <div className={classes.mainContainer}>
          <img src={avatar} alt="avatar" className={classes.photo} />
          <SocialLinks />
          <HelloText />
        </div>
      </ParallaxLayer>
    </>
  );
};

export default Summary;
