/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Parallax } from '@react-spring/parallax';
import { Skeleton } from '@mantine/core';
import { Background, MainNavigation } from './components/Layout';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Projects from './components/Projects';

import useParallax from './hooks/useParallax';
import usePageConfig from './hooks/usePageConfig';

import { Skill, Project } from './models/types.d';

import skillsConfig from './data/skills.json';
import projectsConfig from './data/projects.json';

import ContactMe from './components/ContactMe/ContactMe';

const App = () => {
  const { ref: parallaxRef, scrollTo } = useParallax();
  const {
    ref: projectsRef, pagesConfig, isLoading,
  } = usePageConfig();

  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onAboutClickHandler = () => scrollTo(pagesConfig.summary.start);
  const onSkillsClickHandler = () => scrollTo(pagesConfig.skills.start - 0.04);
  const onProjectsClickHandler = () => scrollTo(pagesConfig.projects.start - 0.05);
  const onContactClickHandler = () => scrollTo(pagesConfig.contactMe.start - 0.05);

  const skills = skillsConfig as any[] as Skill[];
  const projects = projectsConfig as any[] as Project[];

  useEffect(() => {
    if (!isLoading) {
      console.log('updating...');
      forceUpdate();
    }
  }, [isLoading]);

  return (
    <>
      {/* <Skeleton height={50} circle mb="xl" /> */}
      {isLoading && <Skeleton height={10000} mb="xl" />}
      <Background />
      <MainNavigation
        onAboutClick={onAboutClickHandler}
        onSkillsClick={onSkillsClickHandler}
        onProjectsClick={onProjectsClickHandler}
        onContactClick={onContactClickHandler}
      />
      {isLoading && (
        <Parallax
          ref={parallaxRef}
          pages={pagesConfig.pageCount}
        >
          <Summary />
          <Skills skills={skills} />
          <Projects ref={projectsRef} projects={projects} />
          <ContactMe offset={pagesConfig.contactMe.start} />
        </Parallax>
      )}
      {!isLoading && (
        <Parallax
          ref={parallaxRef}
          pages={pagesConfig.pageCount}
        >
          <Summary />
          <Skills skills={skills} />
          <Projects ref={projectsRef} projects={projects} />
          <ContactMe offset={pagesConfig.contactMe.start} />
        </Parallax>
      )}
    </>
  );
};

export default App;
