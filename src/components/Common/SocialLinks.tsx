import { FC } from 'react';
import { ReactComponent as LinkedIn } from '../../images/linkedin.svg';
import { ReactComponent as GitHub } from '../../images/github.svg';
import { ReactComponent as Instagram } from '../../images/instagram.svg';

import userData from '../../data/userData.json';

import classes from './SocialLinks.module.css';

const { socialLinks } = userData;

type SocialLinksPropsType = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const SocialLinks: FC<SocialLinksPropsType> = ({ className }) => (
  <div aria-label="Social links" className={className ? `${className} ${classes.social}` : className}>
    <a
      target="_blank"
      aria-label="LinkedIn link"
      href={socialLinks.linkedin}
      rel="noreferrer"
    >
      <LinkedIn id="linkedin-link" />
    </a>
    <a
      target="_blank"
      aria-label="GitHub link"
      href={socialLinks.github}
      rel="noreferrer"
    >
      <GitHub id="github-link" />
    </a>
    <a
      target="_blank"
      aria-label="Instagram link"
      href={socialLinks.instagram}
      rel="noreferrer"
    >
      <Instagram id="instagram-link" />
    </a>
  </div>
);

export default SocialLinks;
