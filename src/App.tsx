/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import {
  Parallax, IParallax, ParallaxLayer,
} from '@react-spring/parallax';

import Header from './components/Layout/Header';
import Summary from './components/Summary';
import SkillsSticker from './components/Skills/SkillsSticker';

import useScroll from './hooks/useScroll';

import './App.css';
import Skills from './components/Skills/Skills';

const pageConfig = {
  pageCount: 5,
  skillsStart: 1.2,
  skillsEnd: 5,
};

const skillsConfig = {
  name: 'Development tools',
  config: {
    git: 90,
    react: 70,
    typescript: 90,
    node: 90,
  },
};
const skillsConfig2 = {
  name: 'Automation tools',
  config: {
    selenium: 100,
    playwirght: 100,
    cypress: 100,
  },
};
const skillsConfig3 = {
  name: 'CI',
  config: {
    jankins: 100,
    'github-actions': 50,
    'bitbucket-pipelines': 80,
  },
};

const App = () => {
  const parallax = useRef<IParallax>(null);
  const [gradient, setGradient] = useState('linear-gradient(rgb(4, 13, 48) 100%, #d84f96)');
  const { scrollPercent, setScrollPercent } = useScroll({
    factor: pageConfig.pageCount * 0.8,
  });

  useEffect(() => {
    const gradientDarkPercent = 100 - scrollPercent;
    setGradient(`linear-gradient(rgb(4, 11, 39) ${gradientDarkPercent}%, #d84f96)`);
  }, [scrollPercent]);

  const onAboutClick = () => {
    parallax.current?.scrollTo(0);
    setScrollPercent(0);
  };

  const onSkillsClick = () => {
    parallax.current?.scrollTo(pageConfig.skillsStart);
    setScrollPercent((pageConfig.pageCount / (pageConfig.skillsStart + 1)) * 100);
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
        <ParallaxLayer
          sticky={{
            start: pageConfig.skillsStart,
            end: pageConfig.skillsEnd - 1,
          }}
          className="sticky-content"
          style={{
            justifyContent: 'flex-start',
          }}
        >
          <SkillsSticker />
        </ParallaxLayer>
        <Skills
          startPage={pageConfig.skillsStart + 1}
          stepSize={0.5}
          skills={[skillsConfig, skillsConfig2, skillsConfig3]}
        />
      </Parallax>
    </>
  );
};

export default App;
