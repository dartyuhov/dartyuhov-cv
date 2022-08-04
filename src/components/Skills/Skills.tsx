import {
  FC, useCallback, useMemo, useRef,
} from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { Carousel } from '@mantine/carousel';
import { createStyles } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import { useInView } from 'react-intersection-observer';
import FlexCard from '../UI/FlexCard';
import SkillBox from './SkillBox';
import usePageConfig from '../../hooks/usePageConfig';
import useScreenType from '../../hooks/useScreenType';
import { Skill } from '../../models/types.d';

import classes from './Skills.module.css';

type Props = {
  skills: Skill[]
  offset: number
}

const Skills: FC<Props> = ({ skills, offset }) => {
  const [ref, inView] = useInView({ triggerOnce: false });
  const { pagesConfig } = usePageConfig();
  const screenType = useScreenType();

  const autoplayPlugin = useRef(Autoplay({
    delay: 3500,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  }));

  const content = skills.length === 0 ? <div color="white">No skills available</div>
    : skills.map((skill, index) => (
      <Carousel.Slide key={index}>
        <SkillBox skillConfig={skill} key={index} />
      </Carousel.Slide>
    ));

  const getSlidesOnPageAmount = useCallback(() => {
    if (screenType === 'widescreen') {
      return 3;
    }
    if (screenType === 'tablet' || screenType === 'desktop') {
      return 2;
    }
    return 1;
  }, [screenType]);

  const useStyles = useCallback(createStyles(() => {
    const getSlidePercentage = () => {
      if (screenType === 'widescreen') {
        return '33.33333333%';
      }
      if (screenType === 'tablet' || screenType === 'desktop') {
        return '50%';
      }
      return '100%';
    };

    return ({
      slide: {
        maxHeight: '100%',
        paddingLeft: '.5rem',
        maxWidth: getSlidePercentage(),
      },
      controls: {
        transition: 'opacity 0ms ease',
        opacity: 0.5,

        '&:hover': {
          opacity: 1,
        },
      },
      indicators: {
        bottom: 0,
      },
      indicator: {
        width: 12,
        height: 4,
        transition: 'width 250ms ease',

        '&[data-active]': {
          width: 40,
        },
      },
    });
  }), [screenType]);

  const { classes: carouselClasses } = useStyles();

  return useMemo(() => (
    <ParallaxLayer
      id="skills"
      offset={offset}
      factor={pagesConfig.factor}
      speed={pagesConfig.skills.speed}
    >
      {/* move ref to FlexCard */}
      <div ref={ref}>
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
            controlSize={40}
            withControls={skills.length > getSlidesOnPageAmount()}
            slidesToScroll={getSlidesOnPageAmount()}
            classNames={carouselClasses}
            withIndicators={skills.length > getSlidesOnPageAmount()}
            plugins={screenType !== 'mobile' && inView ? [autoplayPlugin.current] : []}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
          >
            {content}
          </Carousel>
        </FlexCard>
      </div>
    </ParallaxLayer>
  ), [
    offset, content, getSlidesOnPageAmount, carouselClasses, inView, screenType,
  ]);
};

export default Skills;
