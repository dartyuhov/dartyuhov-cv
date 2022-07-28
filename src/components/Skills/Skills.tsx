/* eslint-disable no-unused-vars */
import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

import { Carousel } from '@mantine/carousel';

import SkillBox from './SkillBox';

import './Slider.css';
import { Skill } from '../../models/types.d';

import pagesConfig from '../../pages.config';

type Props = {
    skills: Skill[]
}

const Skills: FC<Props> = ({ skills }) => {
  const content = skills.length === 0 ? <div>No skills available</div>
    : skills.map((skill, index) => (
      <Carousel.Slide key={index}>
        <SkillBox skillConfig={skill} key={index} />
      </Carousel.Slide>
    ));
  return (
    <ParallaxLayer id="skills" factor={pagesConfig.skills.factor} offset={pagesConfig.skills.start} speed={1}>
      <div className="title">Skills</div>
      <Carousel
        loop
        align={skills.length > 1 ? 'start' : 'center'}
        withIndicators={skills.length > 1}
        aria-label="Skills carousel"
        nextControlLabel="Next slide (right arrow)"
        previousControlLabel="Previous slide (left arrow)"
        controlSize={60}
        withControls={skills.length > 1}
        slideSize="70%"
      >
        {content}
      </Carousel>
    </ParallaxLayer>
  );
};

export default Skills;
