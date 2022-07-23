import { FC } from 'react';

import classes from './SkillBox.module.css';
import { Skill } from '../../models/types.d';

const SkillBox: FC<Skill> = ({ name, config }) => {
  // eslint-disable-next-line no-unused-vars
  const skills = Object.entries(config).map((entry) => (
    <div className={classes.skill} key={entry[0]}>
      <div className={classes.skillName}>{entry[0]}</div>
      <div className={classes.skillBar}>
        <div className={classes.skillBarFill} style={{ width: `${entry[1]}%` }} />
      </div>
    </div>
  ));

  return (
    <div className={classes.skillContainer}>
      <div className={classes.name}>{name}</div>
      {skills}
    </div>
  );
};

export default SkillBox;
