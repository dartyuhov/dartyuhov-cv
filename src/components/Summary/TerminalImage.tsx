/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { useState, useEffect, FC } from 'react';
import Confetti from 'react-confetti';

import classes from './TerminalImage.module.css';

import runTestsGif from '../../images/runTests.gif';

const TerminalImage: FC<{active:boolean}> = ({ active }) => {
  // const [confettiActive, setConfettiActive] = useState(false);
  // useEffect(() => {
  //   if (active) {
  //     setTimeout(() => {
  //       setConfettiActive(true);
  //     }, 1000);
  //   }
  // }, [active]);

  // const onConfettiComplete = () => {
  //   setConfettiActive(false);
  //   setTimeout(() => {
  //     setConfettiActive(true);
  //   }, 11500);
  // };

  return (
    <div className={classes.code}>
      {/* {confettiActive && (
        <Confetti
          className={classes.confetti}
          width={512}
          height={512}
          opacity={0.9}
          recycle
          tweenDuration={800}
          onConfettiComplete={onConfettiComplete}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
          }}
        />
      )} */}
      {active && <img src={runTestsGif} className={classes.gif} alt="Running some tests..." />}
    </div>
  );
};

export default TerminalImage;
