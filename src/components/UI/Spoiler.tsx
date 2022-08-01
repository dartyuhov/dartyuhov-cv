import {
  FC, ReactNode, useState,
} from 'react';

import { useElementSize } from '@mantine/hooks';

import classes from './Spoiler.module.css';

type SpoilerProps = {
    children: ReactNode;
    maxHeight: number;
    onExpandClickDecorator: () => void;
};

const Spoiler: FC<SpoilerProps> = ({ children, maxHeight, onExpandClickDecorator }) => {
  const { ref, height } = useElementSize();
  const [expanded, setExpanded] = useState(false);

  const onExpandClickHandler = () => {
    onExpandClickDecorator();
    setExpanded(((prevState) => !prevState));
  };

  return (
    <>
      <div
        ref={ref}
        style={{
          maxHeight: !expanded ? `${maxHeight}px` : '320px',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      {height >= maxHeight
        && (
        <button
          className={classes.expandButton}
          onClick={onExpandClickHandler}
          type="button"
        >
          {expanded ? 'Hide' : 'Show more'}
        </button>
        )}
    </>
  );
};

export default Spoiler;
