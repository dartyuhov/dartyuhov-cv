import { Parallax } from '@react-spring/parallax';

import { Background, MainNavigation } from './components/Layout';
import Summary from './components/Summary';
import Skills from './components/Skills';

import useParallax from './hooks/useParallax';

import { Skill } from './models/types.d';

import skillsConfig from './data/skills.json';
import pagesConfig from './pages.config';

const App = () => {
  const { ref: parallaxRef, scrollTo } = useParallax();

  const onAboutClickHandler = () => scrollTo(pagesConfig.summary.start);
  const onSkillsClickHandler = () => scrollTo(pagesConfig.skills.start - 0.04);
  const onProjectsClickHandler = () => scrollTo(2);
  const onContactClickHandler = () => scrollTo(3);

  const skills = skillsConfig as any[] as Skill[];

  return (
    <>
      <Background />
      <MainNavigation
        onAboutClick={onAboutClickHandler}
        onSkillsClick={onSkillsClickHandler}
        onProjectsClick={onProjectsClickHandler}
        onContactClick={onContactClickHandler}
      />
      <Parallax
        ref={parallaxRef}
        pages={pagesConfig.pageCount}
      >
        <Summary />
        <Skills skills={skills} />
      </Parallax>
    </>
  );
};

export default App;
