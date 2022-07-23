import { FC } from 'react';

import classes from './Header.module.css';

type Props = {
  onAboutClick: () => void;
  onSkillsClick: () => void;
  onContactClick: () => void;
  onProjectsClick: () => void;
}

const Header: FC<Props> = ({
  onAboutClick, onSkillsClick, onContactClick, onProjectsClick,
}) => (
  <header className={classes['main-header']}>
    <nav className={classes['main-nav']}>
      <ul>
        <li>
          <button type="button" onClick={onAboutClick}>About</button>
        </li>
        <li>
          <button type="button" onClick={onSkillsClick}>Skills</button>
        </li>
        <li>
          <button type="button" onClick={onProjectsClick}>Projects</button>
        </li>
        <li>
          <button type="button" onClick={onContactClick}>Contact me</button>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
