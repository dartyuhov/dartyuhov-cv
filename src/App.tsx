import { Parallax } from '@react-spring/parallax';

import { Background, MainNavigation } from './components/Layout';
import Summary from './components/Summary';
import Skills from './components/Skills';

import skillsConfig from './data/skills.json';
import useParallax from './hooks/useParallax';
import { Skill } from './models/types.d';

const pageConfig = {
  pageCount: 2,
  skillsStart: 1,
  skillsEnd: 2,
};

const App = () => {
  const { ref: parallaxRef, scrollTo } = useParallax();

  const onAboutClick = () => scrollTo(0);
  const onSkillsClick = () => scrollTo(pageConfig.skillsStart - 0.1);

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
        pages={pageConfig.pageCount}
      >
        <Summary />
        <Skills skills={skills} />
      </Parallax>
    </>
  );
};

export default App;
