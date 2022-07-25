import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import classes from './SkillBox.module.css';
import { Skill } from '../../models/types.d';

const SkillBox: FC<{ skillConfig: Skill }> = ({ skillConfig }) => {
  const [active, setActive] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(inView);
    }, 100);
  }, [inView]);

  const skills = Object.entries(skillConfig.config)
    .sort((a, b) => (a[1] > b[1] ? b[1] : a[1])) // TODO fix sorting
    .map((entry) => (
      <div className={classes.skill} key={entry[0]}>
        <div className={classes.skillName}>{entry[0]}</div>
        <div className={classes.skillBar}>
          <div className={classes.skillBarFill} style={{ width: active ? `${entry[1]}%` : '10%' }}>
            {entry[1]}
            {' '}
            %
          </div>
        </div>
      </div>
    ));

  return (
    <div ref={ref} className={classes.skillContainer}>
      {skills}
    </div>
  );
};

export default SkillBox;
