import { Footer as MantineFooter } from '@mantine/core';
import { ParallaxLayer } from '@react-spring/parallax';
import { FC } from 'react';
import CvLink from '../Common/CvLink';
import SocialLinks from '../Common/SocialLinks';

import classes from './Footer.module.css';

const Footer: FC<{ offset: number }> = ({ offset }) => (
  <ParallaxLayer id="footer" aria-label="Footer" offset={offset} speed={0}>
    <MantineFooter height={400} className={classes.mainContainer}>
      <SocialLinks />
      <CvLink className={classes.downloadCV} />
    </MantineFooter>
  </ParallaxLayer>
);

export default Footer;
