/* eslint-disable no-unused-vars */
import { FC } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';

import FlexCard from '../UI/FlexCard';
import SkillBox from './SkillBox';

import { Skill } from '../../models/types.d';

import classes from './Skills.module.css';
import usePageConfig from '../../hooks/usePageConfig';

type Props = {
  skills: Skill[]
  offset: number
}

const Skills: FC<Props> = ({ skills, offset }) => {
  const { pagesConfig } = usePageConfig();
  const matchesTabletWidth = useMediaQuery('(max-width: 980px)', false);

  const content = skills.length === 0 ? <div color="white">No skills available</div>
    : skills.map((skill, index) => (
      <Carousel.Slide key={index}>
        <SkillBox skillConfig={skill} key={index} />
      </Carousel.Slide>
    ));

  return (
    <ParallaxLayer
      id="skills"
      offset={offset}
      factor={pagesConfig.factor}
      speed={pagesConfig.skills.speed}
    >
      <FlexCard
        title="Skills"
        className={classes.mainContainer}
        contentClassName={classes.content}
      >
        <Carousel
          loop
          align={skills.length > 1 ? 'start' : 'center'}
          aria-label="Skills carousel"
          nextControlLabel="Next slide (right arrow)"
          previousControlLabel="Previous slide (left arrow)"
          controlSize={matchesTabletWidth ? 30 : 40}
          withControls={skills.length > 1}
          slidesToScroll={matchesTabletWidth ? 1 : 2}
          styles={() => ({
            slide: {
              maxHeight: '100%',
              paddingLeft: '1rem',
              maxWidth: matchesTabletWidth ? '100%' : '50%',
            },
          })}
        >
          {content}
        </Carousel>
      </FlexCard>
    </ParallaxLayer>
  );
};

export default Skills;
