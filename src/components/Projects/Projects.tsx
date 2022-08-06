/* eslint-disable no-unused-vars */
import { forwardRef } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { Timeline } from '@mantine/core';
import groupBy from 'lodash.groupby';

import { Project } from '../../models/types.d';
import usePageConfig from '../../hooks/usePageConfig';

import ProjectBox from './ProjectBox';

import classes from './Projects.module.css';
import FlexCard from '../UI/FlexCard';

type ProjectsPropsType = {
  offset: number;
  projects: Project[];
};

const Projects = forwardRef<HTMLDivElement, ProjectsPropsType>(({ projects, offset }, ref) => {
  if (projects.length === 0) {
    return (<div style={{ color: 'white' }}>No projects found</div>);
  }

  const { pagesConfig } = usePageConfig();

  const grouppedByYear = groupBy(projects, 'year');
  const years = Object.keys(grouppedByYear);
  return (
    <ParallaxLayer
      id="projects"
      offset={offset}
      factor={pagesConfig.factor}
      speed={pagesConfig.projects.speed}
    >
      <FlexCard
        title="Projects"
        className={classes.mainContainer}
        ref={ref}
      >
        <Timeline
          radius="xl"
          bulletSize={22}
          lineWidth={2}
          styles={() => ({
            itemTitle: { color: 'white', paddingTop: '0.2rem' },
            item: { borderLeftColor: 'white' },
          })}
        >
          {Object.entries(grouppedByYear).map(([year, yearProjects], index) => (
            <Timeline.Item
              key={index}
              title={year}
              color="white"
              lineVariant={index === years.length - 1 ? 'dashed' : 'solid'}
              lineWidth={3}
            >
              <div className={classes.yearContainer}>
                {yearProjects.map((project, indx) => (
                  <ProjectBox key={indx} project={project} />
                ))}
              </div>
            </Timeline.Item>
          ))}
          <Timeline.Item title={+years[years.length - 1] + 1} />
        </Timeline>
      </FlexCard>
    </ParallaxLayer>
  );
});

export default Projects;
