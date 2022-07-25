import Typewriter from 'typewriter-effect';

import classes from './HelloText.module.css';

const HelloText = () => (
  <>
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString('Hello, I\'m Dzmitry.')
          .start();
      }}
      options={{
        delay: 80,
        wrapperClassName: classes.hello,
        cursor: '',
      }}
    />
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .pauseFor(2000)
          .typeString('Quality Assurance.')
          .pauseFor(700)
          .deleteAll()
          .typeString('Test Automation.')
          .pauseFor(700)
          .deleteAll()
          .typeString('Software Developer In Test.')
          .start();
      }}
      options={{
        delay: 30,
        cursor: '',
        wrapperClassName: classes.shortDescription,
      }}
    />
  </>
);

export default HelloText;
