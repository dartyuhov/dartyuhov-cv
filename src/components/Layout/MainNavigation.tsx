/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';

import { Burger } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import LeftPanel from './LeftPanel';

import classes from './MainNavigation.module.css';

type Props = {
  onAboutClick: () => void;
  onSkillsClick: () => void;
  onContactClick: () => void;
  onProjectsClick: () => void;
}
const responsiveConfig = { mobileView: 768 };

const MainNavigation: FC<Props> = ({
  onAboutClick, onSkillsClick, onContactClick, onProjectsClick,
}) => {
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useWindowEvent('resize', () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth > responsiveConfig.mobileView) {
      setLeftPanelOpened(false);
    }
  });

  const burgerTapHandler = () => setLeftPanelOpened((prevState) => !prevState);

  const navClickDecorator = (scrollFunc: () => void) => {
    if (leftPanelOpened) {
      return () => {
        setLeftPanelOpened((prevState) => !prevState);
        setTimeout(scrollFunc, 200);
      };
    }
    return scrollFunc;
  };

  const leftPanelCloseHandler = () => setLeftPanelOpened(false);

  const mainMenu = (
    <nav className={classes['main-nav']}>
      <ul>
        <li>
          <button type="button" onClick={navClickDecorator(onAboutClick)}>About</button>
        </li>
        <li>
          <button type="button" onClick={navClickDecorator(onSkillsClick)}>Skills</button>
        </li>
        <li>
          <button type="button" onClick={navClickDecorator(onProjectsClick)}>Projects</button>
        </li>
        <li>
          <button type="button" onClick={navClickDecorator(onContactClick)}>Contact me</button>
        </li>
      </ul>
    </nav>
  );

  let headerContent;
  if (windowWidth > responsiveConfig.mobileView) {
    headerContent = mainMenu;
  } else {
    headerContent = (
      <Burger
        opened={leftPanelOpened}
        onClick={burgerTapHandler}
        title="Open navigation"
        aria-label="Open navigation"
        color="white"
        styles={(theme) => ({
          root: {
            paddingRight: '3rem',
          },
        })}
      />
    );
  }
  return (
    <>
      <header className={classes['main-header']}>
        {headerContent}
      </header>
      {leftPanelOpened && windowWidth <= responsiveConfig.mobileView && (
        <LeftPanel
          opened={leftPanelOpened}
          onClose={leftPanelCloseHandler}
        >
          {mainMenu}
        </LeftPanel>
      )}
    </>
  );
};

export default MainNavigation;
