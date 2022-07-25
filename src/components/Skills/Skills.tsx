/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import { Tabs } from '@mantine/core';
import SkillBox from './SkillBox';

import classes from './Skills.module.css';

import { Skill } from '../../models/types.d';

type Props = {
    skills: Skill[]
}

const Skills: FC<Props> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ParallaxLayer
      offset={1}
      speed={1}
    >
      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        variant="unstyled"
        className={classes.skillsPanel}
        styles={(theme) => ({
          tabControl: {
            backgroundColor: theme.colors.background,
            border: '1px solid white',
            width: `${100 / skills.length}%`,
            color: 'white',
            fontSize: '1.1rem',
            height: '3rem',
            padding: '0.5rem',
            opacity: 1,
            '&:not(:first-of-type)': {
              borderLeft: 0,
            },

            '&:first-of-type': {
              borderTopLeftRadius: '1rem',
              borderLeft: '1px solid white',
            },

            '&:last-of-type': {
              borderTopRightRadius: '1rem',
              borderRight: '1px solid white',
            },
          },

          tabActive: {
            backgroundColor: 'white',
            opacity: '0.9',
            borderColor: 'white',
            color: theme.black,
          },
        })}
      >
        {skills.map((skill, index) => (
          <Tabs.Tab
            label={skill.name}
            key={index}
          >
            <SkillBox skillConfig={skill} key={index} />
          </Tabs.Tab>
        ))}
      </Tabs>
    </ParallaxLayer>
  );
};

export default Skills;
