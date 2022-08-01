import { ReactComponent as LinkedIn } from '../../images/linkedin.svg';
import { ReactComponent as GitHub } from '../../images/github.svg';
import { ReactComponent as Instagram } from '../../images/instagram.svg';

import userData from '../../data/userData.json';

import classes from './SocialLinks.module.css';

const { socialLinks } = userData;

const SocialLinks = () => (
  <div className={classes.social}>
    <a
      target="_blank"
      aria-labelledby="LinkedIn link"
      href={socialLinks.linkedin}
      rel="noreferrer"
    >
      <LinkedIn id="linkedin-link" />
    </a>
    <a
      target="_blank"
      aria-labelledby="GitHub Link"
      href={socialLinks.github}
      rel="noreferrer"
    >
      <GitHub id="github-link" />
    </a>
    <a
      target="_blank"
      aria-labelledby="Instagram Link"
      href={socialLinks.instagram}
      rel="noreferrer"
    >
      <Instagram id="instagram-link" />
    </a>
  </div>
);

export default SocialLinks;
