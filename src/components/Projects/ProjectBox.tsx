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
      <h4 aria-label="Project name" className={classes.projectName}>
        {project.name}
        {' '}
        {project.link
          && (
          <a
            className={classes.projectLink}
            href={project.link}
            title="Link to project website"
          >
            🔗
          </a>
          )}
      </h4>

      {project.industry && (
        <p
          className={classes.property}
          aria-label="Project industry"
        >
          Industry:
          {' '}
          <span className={classes.propertyName}>{project.industry}</span>
        </p>
      )}
      <p
        className={classes.property}
        aria-label="Project role"
      >
        Role:
        {' '}
        <span className={classes.propertyName}>{project.role}</span>
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
