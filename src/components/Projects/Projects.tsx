/* eslint-disable no-unused-vars */
import { forwardRef } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { Timeline } from '@mantine/core';
import groupBy from 'lodash.groupby';

import { Project } from '../../models/types.d';
import usePageConfig from '../../hooks/usePageConfig';

import ProjectBox from './ProjectBox';

import classes from './Projects.module.css';

const Projects = forwardRef<HTMLDivElement, { projects: Project[] }>(({ projects }, ref) => {
  if (projects.length === 0) {
    return (<div style={{ color: 'white' }}>No projects found</div>);
  }

  const { pagesConfig } = usePageConfig();

  const grouppedByYear = groupBy(projects, 'year');
  const years = Object.keys(grouppedByYear);
  return (
    <ParallaxLayer
      id="projects"
      offset={pagesConfig.projects.start}
      factor={pagesConfig.factor}
      speed={pagesConfig.projects.speed}
    >
      <div ref={ref} className={classes.mainContainer}>
        <Timeline radius="xl" active={years.length} bulletSize={26} lineWidth={2}>
          <div className={classes.title}>Projects</div>
          {Object.entries(grouppedByYear).map(([year, yearProjects], index) => (
            <Timeline.Item key={index} title={year} lineVariant={index === years.length - 1 ? 'dashed' : 'solid'}>
              <div className={classes.yearContainer}>
                {yearProjects.map((project, indx) => (
                  <ProjectBox key={indx} project={project} />
                ))}
              </div>
            </Timeline.Item>
          ))}
          <Timeline.Item title={+years[years.length - 1] + 1} />
        </Timeline>
      </div>
    </ParallaxLayer>
  );
});

export default Projects;
