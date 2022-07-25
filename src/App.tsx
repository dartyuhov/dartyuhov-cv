import { useEffect, useState } from 'react';
import { Parallax } from '@react-spring/parallax';

import Header from './components/Layout/Header';
import Summary from './components/Summary/Summary';
import Skills from './components/Skills/Skills';

import skillsConfig from './data/skills.json';
import useParallax from './hooks/useParallax';

const pageConfig = {
  pageCount: 2,
  skillsStart: 1,
  skillsEnd: 2,
};

const App = () => {
  const [gradient, setGradient] = useState('linear-gradient(rgb(4, 13, 48) 100%, #d84f96)');
  const { ref: parallax, scrollPercent, trackScroll } = useParallax();

  useEffect(() => {
    const gradientDarkPercent = 100 - scrollPercent * 0.56;
    setGradient(`linear-gradient(rgb(4, 11, 39) ${gradientDarkPercent}%, #d84f96)`);
  }, [scrollPercent]);

  const onAboutClick = () => {
    parallax.current?.scrollTo(0);
    trackScroll(600)();
  };

  const onSkillsClick = () => {
    const skrollsOffset = pageConfig.skillsStart - 0.1;
    parallax.current?.scrollTo(skrollsOffset);
    trackScroll(500)();
  };

  return (
    <>
      <div className="background" style={{ background: gradient }} />
      <Header
        onAboutClick={onAboutClick}
        onSkillsClick={onSkillsClick}
        onProjectsClick={() => {}}
        onContactClick={() => {}}
      />
      <Parallax
        ref={parallax}
        pages={pageConfig.pageCount}
      >
        <Summary blur={scrollPercent * 0.15} />
        <Skills
          skills={skillsConfig as any[]}
        />
      </Parallax>
    </>
  );
};

export default App;
