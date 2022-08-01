import Typewriter from 'typewriter-effect';

import userData from '../../data/userData.json';

import classes from './HelloText.module.css';

const HelloText = () => (
  <>
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .pauseFor(400)
          .typeString(`Hello, I'm ${userData.name}.`)
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
        // wait for the first string to be typed
        typewriter.pauseFor(2500);
        // then start typing roles
        userData.roles.forEach((line, index) => {
          typewriter.typeString(line).pauseFor(700);
          if (index !== userData.roles.length - 1) {
            typewriter.deleteAll();
          }
        });
        typewriter.start();
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
