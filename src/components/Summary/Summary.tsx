import { ParallaxLayer } from '@react-spring/parallax';

import HelloText from './HelloText';
import SocialLinks from './SocialLinks';

import classes from './Summary.module.css';

import avatar from '../../images/avatar.jpeg';
import runTestsGif from '../../images/runTests.gif';

const Summary = () => (
  <>
    <ParallaxLayer offset={0} speed={0.2}>
      <div className={classes.code}>
        <img src={runTestsGif} className={classes.gif} alt="Running some tests..." />
      </div>
    </ParallaxLayer>
    <ParallaxLayer offset={0.1} speed={0.5}>
      <div className={classes.mainContainer}>
        <img src={avatar} alt="avatar" className={classes.photo} />
        <SocialLinks />
        <HelloText />
      </div>
    </ParallaxLayer>
  </>
);

export default Summary;
