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

  const onAboutClick = () => scrollTo(pagesConfig.summary.start);
  const onSkillsClick = () => scrollTo(pagesConfig.skills.start - 0.04);

  const skills = skillsConfig as any[] as Skill[];

  return (
    <>
      <Background />
      <MainNavigation
        onAboutClick={onAboutClick}
        onSkillsClick={onSkillsClick}
        onProjectsClick={() => {}}
        onContactClick={() => {}}
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
