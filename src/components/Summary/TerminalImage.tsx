import classes from './TerminalImage.module.css';

import runTestsGif from '../../images/runTests.gif';

const TerminalImage = () => (
  <div className={classes.code}>
    <img src={runTestsGif} className={classes.gif} alt="Running some tests..." />
  </div>
);

export default TerminalImage;
