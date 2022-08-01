/* eslint-disable no-unused-vars */
import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { Carousel } from '@mantine/carousel';

import { Skill } from '../../models/types.d';
import SkillBox from './SkillBox';

import './Carousel.css';
import usePageConfig from '../../hooks/usePageConfig';

type Props = {
  skills: Skill[]
}

const Skills: FC<Props> = ({ skills }) => {
  const { pagesConfig } = usePageConfig();

  const content = skills.length === 0 ? <div>No skills available</div>
    : skills.map((skill, index) => (
      <Carousel.Slide key={index}>
        <SkillBox skillConfig={skill} key={index} />
      </Carousel.Slide>
    ));

  return (
    <ParallaxLayer
      id="skills"
      offset={pagesConfig.skills.start}
      factor={pagesConfig.factor}
      speed={pagesConfig.skills.speed}
    >
      <div className="mainContainer">
        <h3 className="title">Skills</h3>
        <Carousel
          loop
          align={skills.length > 1 ? 'start' : 'center'}
          withIndicators={skills.length > 1}
          aria-label="Skills carousel"
          nextControlLabel="Next slide (right arrow)"
          previousControlLabel="Previous slide (left arrow)"
          controlSize={50}
          withControls={skills.length > 1}
        >
          {content}
        </Carousel>
      </div>
    </ParallaxLayer>
  );
};

export default Skills;
