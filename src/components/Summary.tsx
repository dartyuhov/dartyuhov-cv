import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import classes from './Summary.module.css';
import avatar from './images/avatar.jpeg';

// eslint-disable-next-line no-unused-vars
const Summary: FC<{blur: number}> = ({ blur: state = 0 }) => (
  <>
    <ParallaxLayer offset={0} speed={0.3}>
      <div
        id="about"
        className={classes.main}
        style={{
          filter: `blur(${state}px)`,
        }}
      />
    </ParallaxLayer>
    <ParallaxLayer offset={0.1} speed={0.5}>
      <section className={classes['hello-container']}>
        <div className={classes.photo}>
          <img
            src={avatar}
            alt="avatar"
          />
        </div>
        <div className={classes.hello}>
          <h1>
            Hello, I&apos;m
            {' '}
            Dzmitry.
          </h1>
        </div>
      </section>
    </ParallaxLayer>
  </>
);

export default Summary;
