import { FC, useState } from 'react';

import { Project } from '../../models/types.d';
import Spoiler from '../UI/Spoiler';
import classes from './ProjectBox.module.css';

const ProjectBox: FC<{ project: Project }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => setExpanded((prevState) => !prevState);
  return (
    <div className={classes.project}>
      <h4 className={classes.projectName}>{project.name}</h4>
      <p className={classes.role}>
        Role:
        {' '}
        <span className={classes.roleName}>{project.role}</span>
      </p>
      <Spoiler
        maxHeight={90}
        onExpandClickDecorator={expandClickHandler}
      >
        {project.description}
      </Spoiler>
      {!expanded && (
        <>
          <h4>Technologies:</h4>
          <div className={classes.techStack}>
            {project.techStack.map((tech, index) => (
              <div key={index} className={classes.tech}>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ProjectBox;
