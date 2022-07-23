/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import SkillBox from './SkillBox';
import { Skill } from '../../models/types.d';

type Props = {
    startPage: number,
    stepSize: number,
    skills: Skill[]
}

const Skills: FC<Props> = ({ startPage, stepSize, skills }) => (
  <>
    {skills.map((skill, index) => (
      <ParallaxLayer
        offset={startPage + index * stepSize}
        className="sticky-content"
        style={{
          justifyContent: 'flex-end',
        }}
      >
        <SkillBox {...skill} />
      </ParallaxLayer>
    ))}
  </>
);

export default Skills;
