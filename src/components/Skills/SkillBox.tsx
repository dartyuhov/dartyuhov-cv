import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import classes from './SkillBox.module.css';
import { Skill } from '../../models/types.d';

const SkillBox: FC<{ skillConfig: Skill }> = ({ skillConfig }) => {
  const [active, setActive] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    setTimeout(() => {
      setActive(inView);
    }, 800);
  }, [inView]);

  const skills = Object.entries(skillConfig.config)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => (
      <div className={classes.skill} key={entry[0]}>
        <div aria-label="Skill title" className={classes.skillName}>{entry[0]}</div>
        <div aria-label={`Skill of ${entry[0]}`} className={classes.skillBar}>
          <div
            aria-label={`Skill knowldege is ${entry[1]}%`}
            className={classes.skillBarFill}
            style={{ width: active ? `${entry[1]}%` : '8%' }}
          />
        </div>
      </div>
    ));

  return (
    <div ref={ref} className={classes.skillContainer}>
      <div aria-label={`skill ${skillConfig.name}`} className={classes.name}>{skillConfig.name}</div>
      {skills}
    </div>
  );
};

export default SkillBox;
