import { ReactComponent as LinkedIn } from '../../images/linkedin.svg';
import { ReactComponent as GitHub } from '../../images/github.svg';
import { ReactComponent as Instagram } from '../../images/instagram.svg';

import classes from './SocialLinks.module.css';

const SocialLinks = () => (
  <div className={classes.social}>
    <a
      target="_blank"
      aria-labelledby="LinkedIn link"
      href="https://www.linkedin.com/in/dmitry-artyuhov-75873913b"
      rel="noreferrer"
    >
      <LinkedIn id="linkedin-link" />
    </a>
    <a
      target="_blank"
      aria-labelledby="GitHub Link"
      href="https://github.com/dartyuhov"
      rel="noreferrer"
    >
      <GitHub id="github-link" />
    </a>
    <a
      target="_blank"
      aria-labelledby="Instagram Link"
      href="https://www.instagram.com/dima_artyukhov"
      rel="noreferrer"
    >
      <Instagram id="instagram-link" />
    </a>
  </div>
);

export default SocialLinks;
