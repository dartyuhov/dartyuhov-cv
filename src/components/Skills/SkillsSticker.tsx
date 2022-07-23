import { FC } from 'react';

import classes from './SkillsSticker.module.css';

// eslint-disable-next-line no-empty-pattern
const SkillsSticker: FC = () => (
  <div className={classes.sticker}>
    <div className={classes.scrollText}> My skills:</div>
  </div>
);

export default SkillsSticker;
