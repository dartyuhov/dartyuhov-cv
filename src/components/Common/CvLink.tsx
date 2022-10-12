import { FC, useState } from 'react';

import { ReactComponent as DownloadIcon } from '../../images/download.svg';

import userData from '../../data/userData.json';
import classes from './CvLink.module.css';

type CvLinkProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};
const CvLink: FC<CvLinkProps> = ({ className }) => {
  const [downloadIconFill, setDownloadIconFill] = useState('white');

  const onMouseEnter = () => {
    setDownloadIconFill('#777173');
  };
  const onMouseLeave = () => {
    setDownloadIconFill('white');
  };

  return (
    <a
      target="_blank"
      aria-label="Download CV"
      href={userData.cvLink}
      rel="noreferrer"
      className={className ? `${className} ${classes.downloadCvLink}` : classes.downloadCvLink}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Download CV
      <DownloadIcon
        height={24}
        data-testid="download-icon"
        width={24}
        fill={downloadIconFill}
      />
    </a>
  );
};

export default CvLink;
