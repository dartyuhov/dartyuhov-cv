import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import HelloText from './HelloText';
import SocialLinks from './SocialLinks';

import classes from './Summary.module.css';
import avatar from '../images/avatar.jpeg';

const Summary: FC<{ blur: number }> = ({ blur: state = 0 }) => (
  <>
    <ParallaxLayer offset={0} speed={0.3}>
      <div
        className={classes.main}
        style={{
          filter: `blur(${state}px)`,
        }}
      />
    </ParallaxLayer>
    <ParallaxLayer offset={0} speed={0.5}>
      <div className={classes.mainContainer}>
        <img src={avatar} alt="avatar" className={classes.photo} />
        <SocialLinks />
        <HelloText />
      </div>
    </ParallaxLayer>
  </>
);

export default Summary;
