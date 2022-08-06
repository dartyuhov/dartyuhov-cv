import { FC, useState } from 'react';
import { Project } from '../../models/types.d';
import Spoiler from '../UI/Spoiler';
import classes from './ProjectBox.module.css';

const ProjectBox: FC<{ project: Project }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  const expandClickHandler = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setTimeout(() => setExpanded(false), 300);
    }
  };

  return (
    <div className={classes.project}>
      <h4 aria-label="Project name" className={classes.projectName}>{project.name}</h4>
      <p className={classes.role}>
        Role:
        {' '}
        <span className={classes.roleName}>{project.role}</span>
      </p>
      <Spoiler
        maxHeight={100}
        onExpandClickDecorator={expandClickHandler}
        ariaLabel="Project description"
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: project.description }} style={{ color: 'white' }} />
      </Spoiler>
      {!expanded && project.techStack.length > 0 && (
      <>
        <h4 className={classes.techStackTitle}>Technologies:</h4>
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
