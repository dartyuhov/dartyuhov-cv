/* eslint-disable react/require-default-props */
import { ReactNode, FC } from 'react';

import classes from './FlexCard.module.css';

type FlexCardProps = {
    title: string,
    children: ReactNode,
    className?: string,
    contentClassName?: string,
}

const FlexCard: FC<FlexCardProps> = ({
  title, children, className, contentClassName,
}) => (
  <div className={`${classes.mainContainer} ${className}`}>
    <div className={contentClassName ? `${contentClassName} ${classes.content}` : classes.contentClassName}>
      <div className={classes.title}>{title}</div>
      {children}
    </div>
  </div>
);

export default FlexCard;
