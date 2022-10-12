import { Parallax } from '@react-spring/parallax';
import { LoadingOverlay } from '@mantine/core';
import { Background, MainNavigation, Footer } from './components/Layout';
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
  const { projectsSectionRef, pagesConfig, isLoading } = usePageConfig();

  const onAboutClickHandler = () => scrollTo(pagesConfig.summary.start);
  const onSkillsClickHandler = () => scrollTo(pagesConfig.skills.start - 0.05);
  const onProjectsClickHandler = () => scrollTo(pagesConfig.projects.start - 0.1);
  const onContactClickHandler = () => scrollTo(pagesConfig.contactMe.start - 0.05);

  const skills = skillsConfig as any[] as Skill[];
  const projects = projectsConfig as any[] as Project[];

  return (
    <>
      <Background />
      <MainNavigation
        onAboutClick={onAboutClickHandler}
        onSkillsClick={onSkillsClickHandler}
        onProjectsClick={onProjectsClickHandler}
        onContactClick={onContactClickHandler}
      />
      {isLoading && (
        <LoadingOverlay
          visible
          loaderProps={{ size: 'lg', variant: 'bars', color: 'white' }}
          overlayOpacity={0.6}
          overlayColor="black"
          overlayBlur={2}
        />
      )}
      <Parallax
        // set unique key to rerender component once pageConfig.pageCount changes
        key={pagesConfig.pageCount}
        ref={parallaxRef}
        pages={pagesConfig.pageCount}
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        <Summary offset={pagesConfig.summary.start} />
        <Skills offset={pagesConfig.skills.start} skills={skills} />
        <Projects
          offset={pagesConfig.projects.start}
          ref={projectsSectionRef}
          projects={projects}
        />
        <ContactMe offset={pagesConfig.contactMe.start} />
        <Footer offset={pagesConfig.footer.start} />
      </Parallax>
    </>
  );
};

export default App;
